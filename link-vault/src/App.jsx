import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  STORAGE_KEYS,
  DEFAULT_CATEGORIES,
  FORMATS,
  SEED_LINKS,
  SEED_VERSION,
  CAT_VERSION
} from './constants';
import { styles, colors } from './styles';
import { syncToGist, fetchFromGist, createDebouncedSync } from './gist';
import LinkCard from './components/LinkCard';
import SettingsPanel from './components/SettingsPanel';
import BulkBar from './components/BulkBar';
import FilterBar from './components/FilterBar';

function App() {
  // Core state
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [ghToken, setGhToken] = useState('');

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState(null);
  const [curatedFilter, setCuratedFilter] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState(new Set());
  const [multiSelectMode, setMultiSelectMode] = useState(false);

  // Add link form state
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newFormats, setNewFormats] = useState([]);

  // Sync state
  const [syncStatus, setSyncStatus] = useState('idle'); // idle | syncing | synced | error
  const [syncError, setSyncError] = useState('');

  // Category management state
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatEmoji, setNewCatEmoji] = useState('');
  const [newCatColor, setNewCatColor] = useState('#FF6B35');

  // Initialize data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEYS.DATA);
    const savedSeedVersion = localStorage.getItem(STORAGE_KEYS.SEED_VERSION);
    const savedCatVersion = localStorage.getItem(STORAGE_KEYS.CAT_VERSION);
    const savedToken = localStorage.getItem(STORAGE_KEYS.GH_TOKEN);

    let loadedLinks = [];
    let loadedCategories = DEFAULT_CATEGORIES;

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        loadedLinks = parsed.links || [];
        loadedCategories = parsed.categories || DEFAULT_CATEGORIES;
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }

    // Inject new seed links if version bumped
    const needsSeedUpdate = !savedSeedVersion || parseInt(savedSeedVersion) < SEED_VERSION;
    if (needsSeedUpdate) {
      const existingIds = new Set(loadedLinks.map(l => l.id));
      const newSeeds = SEED_LINKS.filter(s => !existingIds.has(s.id));
      loadedLinks = [...loadedLinks, ...newSeeds];
      localStorage.setItem(STORAGE_KEYS.SEED_VERSION, String(SEED_VERSION));
    }

    // Reset categories if version bumped
    const needsCatUpdate = !savedCatVersion || parseInt(savedCatVersion) < CAT_VERSION;
    if (needsCatUpdate) {
      loadedCategories = DEFAULT_CATEGORIES;
      localStorage.setItem(STORAGE_KEYS.CAT_VERSION, String(CAT_VERSION));
    }

    setLinks(loadedLinks);
    setCategories(loadedCategories);

    if (savedToken) {
      setGhToken(savedToken);
    }

    // Set default category for new links
    if (loadedCategories.length > 0) {
      setNewCategory(loadedCategories[0].id);
    }
  }, []);

  // Save to localStorage whenever links or categories change
  useEffect(() => {
    if (links.length > 0 || categories.length > 0) {
      const data = { links, categories };
      localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(data));
    }
  }, [links, categories]);

  // Debounced gist sync
  const debouncedSync = useMemo(() => {
    return createDebouncedSync(async (token, data) => {
      setSyncStatus('syncing');
      const result = await syncToGist(token, {
        ...data,
        lastSync: new Date().toISOString(),
        count: data.links.length
      });
      if (result.success) {
        setSyncStatus('synced');
        setSyncError('');
      } else {
        setSyncStatus('error');
        setSyncError(result.error);
      }
    }, 1500);
  }, []);

  // Trigger sync when data changes and token exists
  useEffect(() => {
    if (ghToken && (links.length > 0 || categories.length > 0)) {
      debouncedSync(ghToken, { links, categories });
    }
  }, [links, categories, ghToken, debouncedSync]);

  // Fetch from gist on token save
  const handlePullFromGist = useCallback(async () => {
    if (!ghToken) return;

    setSyncStatus('syncing');
    const result = await fetchFromGist(ghToken);

    if (result.success && result.data) {
      const gistData = result.data;
      // Compare timestamps if available
      const localData = localStorage.getItem(STORAGE_KEYS.DATA);
      let shouldRestore = true;

      if (localData && gistData.lastSync) {
        const localParsed = JSON.parse(localData);
        // If we have local data, ask if gist is newer
        if (localParsed.links?.length > 0) {
          shouldRestore = window.confirm(
            `Found backup from ${new Date(gistData.lastSync).toLocaleString()} with ${gistData.count || 0} links. Restore from Gist?`
          );
        }
      }

      if (shouldRestore && gistData.links) {
        setLinks(gistData.links);
        if (gistData.categories) {
          setCategories(gistData.categories);
        }
        setSyncStatus('synced');
        setSyncError('');
      } else {
        setSyncStatus('idle');
      }
    } else if (result.error) {
      setSyncStatus('error');
      setSyncError(result.error);
    } else {
      setSyncStatus('synced');
    }
  }, [ghToken]);

  // Add new link
  const handleAddLink = useCallback((e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const url = newUrl.trim();
    const title = newTitle.trim() || url;

    const link = {
      id: `link-${Date.now()}`,
      url,
      title,
      category: newCategory || categories[0]?.id || 'controversial',
      formats: newFormats,
      curated: false,
      createdAt: Date.now()
    };

    setLinks(prev => [link, ...prev]);
    setNewUrl('');
    setNewTitle('');
    setNewFormats([]);
  }, [newUrl, newTitle, newCategory, newFormats, categories]);

  // Update link
  const handleUpdateLink = useCallback((id, updates) => {
    setLinks(prev => prev.map(link =>
      link.id === id ? { ...link, ...updates } : link
    ));
  }, []);

  // Delete link
  const handleDeleteLink = useCallback((id) => {
    setLinks(prev => prev.filter(link => link.id !== id));
    setSelectedLinks(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Toggle link selection
  const handleToggleSelect = useCallback((id) => {
    setSelectedLinks(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Bulk operations
  const handleBulkCategory = useCallback((categoryId) => {
    setLinks(prev => prev.map(link =>
      selectedLinks.has(link.id) ? { ...link, category: categoryId } : link
    ));
    setSelectedLinks(new Set());
    setMultiSelectMode(false);
  }, [selectedLinks]);

  const handleBulkFormat = useCallback((formatId) => {
    setLinks(prev => prev.map(link => {
      if (!selectedLinks.has(link.id)) return link;
      const formats = link.formats || [];
      if (formats.includes(formatId)) {
        return { ...link, formats: formats.filter(f => f !== formatId) };
      }
      return { ...link, formats: [...formats, formatId] };
    }));
  }, [selectedLinks]);

  const handleBulkCurate = useCallback(() => {
    setLinks(prev => prev.map(link =>
      selectedLinks.has(link.id) ? { ...link, curated: true } : link
    ));
    setSelectedLinks(new Set());
    setMultiSelectMode(false);
  }, [selectedLinks]);

  const handleBulkDelete = useCallback(() => {
    if (!window.confirm(`Delete ${selectedLinks.size} selected links?`)) return;
    setLinks(prev => prev.filter(link => !selectedLinks.has(link.id)));
    setSelectedLinks(new Set());
    setMultiSelectMode(false);
  }, [selectedLinks]);

  // Category management
  const handleAddCategory = useCallback((e) => {
    e.preventDefault();
    if (!newCatName.trim() || !newCatEmoji.trim()) return;

    const category = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      emoji: newCatEmoji.trim(),
      color: newCatColor
    };

    setCategories(prev => [...prev, category]);
    setNewCatName('');
    setNewCatEmoji('');
    setNewCatColor('#FF6B35');
  }, [newCatName, newCatEmoji, newCatColor]);

  const handleDeleteCategory = useCallback((catId) => {
    const cat = categories.find(c => c.id === catId);
    const linkCount = links.filter(l => l.category === catId).length;

    if (linkCount > 0) {
      if (!window.confirm(`Delete "${cat?.name}" and its ${linkCount} links?`)) return;
      setLinks(prev => prev.filter(link => link.category !== catId));
    }

    setCategories(prev => prev.filter(c => c.id !== catId));
    if (categoryFilter === catId) {
      setCategoryFilter('all');
    }
  }, [categories, links, categoryFilter]);

  // Token management
  const handleSaveToken = useCallback((token) => {
    setGhToken(token);
    localStorage.setItem(STORAGE_KEYS.GH_TOKEN, token);
    // Trigger immediate sync
    if (token) {
      handlePullFromGist();
    }
  }, [handlePullFromGist]);

  const handleDisconnect = useCallback(() => {
    setGhToken('');
    localStorage.removeItem(STORAGE_KEYS.GH_TOKEN);
    setSyncStatus('idle');
    setSyncError('');
  }, []);

  // Export/Import
  const handleExport = useCallback(() => {
    const data = { links, categories, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkvault-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [links, categories]);

  const handleImport = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.links) setLinks(data.links);
        if (data.categories) setCategories(data.categories);
      } catch (err) {
        alert('Failed to parse backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  // Filtered links
  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!link.title?.toLowerCase().includes(query) &&
            !link.url?.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== 'all' && link.category !== categoryFilter) {
        return false;
      }

      // Format filter
      if (formatFilter && !link.formats?.includes(formatFilter)) {
        return false;
      }

      // Curated filter
      if (curatedFilter && !link.curated) {
        return false;
      }

      return true;
    });
  }, [links, searchQuery, categoryFilter, formatFilter, curatedFilter]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: links.length };
    categories.forEach(cat => {
      counts[cat.id] = links.filter(l => l.category === cat.id).length;
    });
    return counts;
  }, [links, categories]);

  // Format counts
  const formatCounts = useMemo(() => {
    const counts = {};
    FORMATS.forEach(f => {
      counts[f.id] = links.filter(l => l.formats?.includes(f.id)).length;
    });
    counts.curated = links.filter(l => l.curated).length;
    return counts;
  }, [links]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>
          Link<span style={styles.titleAccent}>Vault</span>
        </h1>
        <div style={styles.headerButtons}>
          <button
            style={{
              ...styles.iconButton,
              ...(multiSelectMode ? { borderColor: colors.accent, color: colors.accent } : {})
            }}
            onClick={() => {
              setMultiSelectMode(!multiSelectMode);
              setSelectedLinks(new Set());
            }}
            title="Multi-select mode"
          >
            {multiSelectMode ? '✓ Select' : '☐ Select'}
          </button>
          <button
            style={{
              ...styles.iconButton,
              ...(ghToken ? styles.iconButtonActive : {})
            }}
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            ⚙
          </button>
          <button
            style={styles.iconButton}
            onClick={handleExport}
            title="Export backup"
          >
            ⬇
          </button>
          <label style={styles.iconButton} title="Import backup">
            ⬆
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          token={ghToken}
          onSaveToken={handleSaveToken}
          onDisconnect={handleDisconnect}
          onPull={handlePullFromGist}
          syncStatus={syncStatus}
          syncError={syncError}
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          showCategoryManager={showCategoryManager}
          onToggleCategoryManager={() => setShowCategoryManager(!showCategoryManager)}
          newCatName={newCatName}
          setNewCatName={setNewCatName}
          newCatEmoji={newCatEmoji}
          setNewCatEmoji={setNewCatEmoji}
          newCatColor={newCatColor}
          setNewCatColor={setNewCatColor}
        />
      )}

      {/* Add Link Form */}
      <form style={styles.addForm} onSubmit={handleAddLink}>
        <input
          type="url"
          placeholder="Paste URL..."
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Title (optional)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ ...styles.input, flex: 0.5 }}
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>
          + Add
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search links..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      {/* Filters */}
      <FilterBar
        categories={categories}
        categoryFilter={categoryFilter}
        onCategoryFilter={setCategoryFilter}
        categoryCounts={categoryCounts}
        formatFilter={formatFilter}
        onFormatFilter={setFormatFilter}
        formatCounts={formatCounts}
        curatedFilter={curatedFilter}
        onCuratedFilter={setCuratedFilter}
      />

      {/* Links */}
      {filteredLinks.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🔗</div>
          <p style={styles.emptyText}>
            {links.length === 0 ? 'No links yet. Add your first link above!' : 'No links match your filters.'}
          </p>
        </div>
      ) : (
        filteredLinks.map(link => (
          <LinkCard
            key={link.id}
            link={link}
            categories={categories}
            multiSelectMode={multiSelectMode}
            isSelected={selectedLinks.has(link.id)}
            onToggleSelect={handleToggleSelect}
            onUpdate={handleUpdateLink}
            onDelete={handleDeleteLink}
          />
        ))
      )}

      {/* Bulk Action Bar */}
      {selectedLinks.size > 0 && (
        <BulkBar
          count={selectedLinks.size}
          categories={categories}
          onCategory={handleBulkCategory}
          onFormat={handleBulkFormat}
          onCurate={handleBulkCurate}
          onDelete={handleBulkDelete}
          onClear={() => {
            setSelectedLinks(new Set());
            setMultiSelectMode(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
