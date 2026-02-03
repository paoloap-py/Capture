import React, { useState, useCallback } from 'react';
import { FORMATS } from '../constants';
import { styles, colors } from '../styles';

// SVG icons for LinkedIn and Medium
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MediumIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

function LinkCard({
  link,
  categories,
  multiSelectMode,
  isSelected,
  onToggleSelect,
  onUpdate,
  onDelete
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title);
  const [editUrl, setEditUrl] = useState(link.url);
  const [copied, setCopied] = useState(false);

  const category = categories.find(c => c.id === link.category);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [link.url]);

  const handleSaveEdit = useCallback(() => {
    onUpdate(link.id, {
      title: editTitle.trim() || link.url,
      url: editUrl.trim()
    });
    setIsEditing(false);
  }, [link.id, link.url, editTitle, editUrl, onUpdate]);

  const handleToggleFormat = useCallback((formatId) => {
    const formats = link.formats || [];
    if (formats.includes(formatId)) {
      onUpdate(link.id, { formats: formats.filter(f => f !== formatId) });
    } else {
      onUpdate(link.id, { formats: [...formats, formatId] });
    }
  }, [link.id, link.formats, onUpdate]);

  const handleCategoryChange = useCallback((e) => {
    onUpdate(link.id, { category: e.target.value });
  }, [link.id, onUpdate]);

  const handleToggleCurated = useCallback(() => {
    onUpdate(link.id, { curated: !link.curated });
  }, [link.id, link.curated, onUpdate]);

  const getFormatIcon = (format) => {
    if (format.icon === 'linkedin') return <LinkedInIcon />;
    if (format.icon === 'medium') return <MediumIcon />;
    return format.icon;
  };

  return (
    <div
      style={{
        ...styles.linkCard,
        ...(isSelected ? styles.linkCardSelected : {})
      }}
    >
      {/* Header row */}
      <div style={styles.linkHeader}>
        {multiSelectMode && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(link.id)}
            style={styles.checkbox}
          />
        )}

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={styles.linkTitleInput}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
          />
        ) : (
          <span style={styles.linkTitle}>{link.title}</span>
        )}

        {/* Curate star */}
        <button
          style={styles.curateButton}
          onClick={handleToggleCurated}
          title={link.curated ? 'Remove from curated' : 'Mark as curated'}
        >
          {link.curated ? (
            <span style={{ color: colors.curatedStar }}>★</span>
          ) : (
            <span style={{ color: colors.textMuted }}>☆</span>
          )}
        </button>
      </div>

      {/* URL */}
      {isEditing ? (
        <input
          type="url"
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
          style={styles.linkUrlInput}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
        />
      ) : (
        <div style={styles.linkUrl}>{link.url}</div>
      )}

      {/* Footer */}
      <div style={styles.linkFooter}>
        {/* Category badge */}
        {isEditing ? (
          <select
            value={link.category}
            onChange={handleCategoryChange}
            style={styles.select}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        ) : category ? (
          <span
            style={{
              ...styles.categoryBadge,
              background: `${category.color}22`,
              color: category.color
            }}
          >
            {category.emoji} {category.name}
          </span>
        ) : null}

        {/* Format badges */}
        <div style={styles.formatBadges}>
          {FORMATS.map(format => {
            const isActive = link.formats?.includes(format.id);
            return (
              <button
                key={format.id}
                style={{
                  ...styles.formatBadge,
                  background: isActive ? `${format.color}22` : 'transparent',
                  color: isActive ? format.color : colors.textDim,
                  border: `1px solid ${isActive ? format.color : colors.cardBorder}`
                }}
                onClick={() => handleToggleFormat(format.id)}
                title={format.name}
              >
                {getFormatIcon(format)}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div style={styles.linkActions}>
          <button
            style={styles.actionBtn}
            onClick={handleCopy}
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
          {isEditing ? (
            <>
              <button
                style={{ ...styles.actionBtn, color: colors.success }}
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                style={styles.actionBtn}
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(link.title);
                  setEditUrl(link.url);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                style={styles.actionBtn}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </button>
              <button
                style={{ ...styles.actionBtn, color: colors.error }}
                onClick={() => onDelete(link.id)}
              >
                🗑
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LinkCard;
