import React, { useState } from 'react';
import { styles, colors } from '../styles';

function SettingsPanel({
  token,
  onSaveToken,
  onDisconnect,
  onPull,
  syncStatus,
  syncError,
  categories,
  onAddCategory,
  onDeleteCategory,
  showCategoryManager,
  onToggleCategoryManager,
  newCatName,
  setNewCatName,
  newCatEmoji,
  setNewCatEmoji,
  newCatColor,
  setNewCatColor
}) {
  const [inputToken, setInputToken] = useState('');

  const handleSave = () => {
    if (inputToken.trim()) {
      onSaveToken(inputToken.trim());
      setInputToken('');
    }
  };

  const getSyncStatusDisplay = () => {
    switch (syncStatus) {
      case 'syncing':
        return <span style={styles.syncStatusSyncing}>⟳ Syncing...</span>;
      case 'synced':
        return <span style={styles.syncStatusSynced}>✓ Synced</span>;
      case 'error':
        return <span style={styles.syncStatusError}>✕ {syncError}</span>;
      default:
        return <span style={{ color: colors.textMuted }}>Not connected</span>;
    }
  };

  return (
    <div style={styles.settingsPanel}>
      <h3 style={styles.settingsTitle}>Settings</h3>

      {/* GitHub Gist Sync */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ ...styles.settingsLabel, marginBottom: '8px' }}>
          GitHub Gist Sync
        </div>

        {token ? (
          <>
            <div style={styles.settingsRow}>
              <div style={styles.syncStatus}>
                {getSyncStatusDisplay()}
              </div>
            </div>
            <div style={styles.settingsRow}>
              <button
                style={styles.buttonSecondary}
                onClick={onPull}
              >
                ↓ Pull from Gist
              </button>
              <button
                style={{ ...styles.buttonSecondary, color: colors.error }}
                onClick={onDisconnect}
              >
                Disconnect
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={styles.settingsRow}>
              <input
                type="password"
                placeholder="GitHub Personal Access Token (ghp_...)"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                style={{ ...styles.input, flex: 1 }}
              />
              <button
                style={styles.button}
                onClick={handleSave}
                disabled={!inputToken.trim()}
              >
                Save & Sync
              </button>
            </div>
            <p style={{ fontSize: '12px', color: colors.textMuted, marginTop: '8px' }}>
              Requires a Classic PAT with <code>gist</code> scope.
              <a
                href="https://github.com/settings/tokens/new?description=LinkVault&scopes=gist"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.accent, marginLeft: '4px' }}
              >
                Create one →
              </a>
            </p>
          </>
        )}
      </div>

      {/* Category Manager */}
      <div>
        <button
          style={{
            ...styles.buttonSecondary,
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          onClick={onToggleCategoryManager}
        >
          <span>Manage Categories</span>
          <span>{showCategoryManager ? '▲' : '▼'}</span>
        </button>

        {showCategoryManager && (
          <div style={{ marginTop: '16px' }}>
            {/* Existing categories */}
            <div style={styles.categoryList}>
              {categories.map(cat => (
                <div key={cat.id} style={styles.categoryItem}>
                  <span style={styles.categoryEmoji}>{cat.emoji}</span>
                  <span style={styles.categoryName}>{cat.name}</span>
                  <div
                    style={{
                      ...styles.categoryColor,
                      backgroundColor: cat.color
                    }}
                  />
                  <button
                    style={styles.deleteBtn}
                    onClick={() => onDeleteCategory(cat.id)}
                    title="Delete category"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add new category */}
            <form
              onSubmit={onAddCategory}
              style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
            >
              <input
                type="text"
                placeholder="Emoji"
                value={newCatEmoji}
                onChange={(e) => setNewCatEmoji(e.target.value)}
                style={{ ...styles.input, width: '60px', flex: 'none' }}
                maxLength={2}
              />
              <input
                type="text"
                placeholder="Category name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                style={{ ...styles.input, flex: 1 }}
              />
              <input
                type="color"
                value={newCatColor}
                onChange={(e) => setNewCatColor(e.target.value)}
                style={{ ...styles.categoryColor, cursor: 'pointer' }}
              />
              <button
                type="submit"
                style={styles.button}
                disabled={!newCatName.trim() || !newCatEmoji.trim()}
              >
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPanel;
