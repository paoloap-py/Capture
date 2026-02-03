import React, { useState } from 'react';
import { FORMATS } from '../constants';
import { styles, colors } from '../styles';

function BulkBar({
  count,
  categories,
  onCategory,
  onFormat,
  onCurate,
  onDelete,
  onClear
}) {
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  return (
    <div style={styles.bulkBar}>
      <span style={styles.bulkCount}>{count} selected</span>

      {/* Category dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          style={styles.bulkBtn}
          onClick={() => {
            setShowCatDropdown(!showCatDropdown);
            setShowFormatDropdown(false);
          }}
        >
          📁 Category ▾
        </button>
        {showCatDropdown && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              marginBottom: '8px',
              background: colors.card,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: '8px',
              overflow: 'hidden',
              zIndex: 101
            }}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: colors.text,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '13px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onCategory(cat.id);
                  setShowCatDropdown(false);
                }}
                onMouseEnter={(e) => e.target.style.background = colors.cardBorder}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Format dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          style={styles.bulkBtn}
          onClick={() => {
            setShowFormatDropdown(!showFormatDropdown);
            setShowCatDropdown(false);
          }}
        >
          🏷 Format ▾
        </button>
        {showFormatDropdown && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              marginBottom: '8px',
              background: colors.card,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: '8px',
              overflow: 'hidden',
              zIndex: 101
            }}
          >
            {FORMATS.map(format => (
              <button
                key={format.id}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: format.color,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '13px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onFormat(format.id);
                  setShowFormatDropdown(false);
                }}
                onMouseEnter={(e) => e.target.style.background = colors.cardBorder}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                {typeof format.icon === 'string' && format.icon.length <= 2 ? format.icon : '●'} {format.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Curate button */}
      <button
        style={{
          ...styles.bulkBtn,
          color: colors.curatedStar
        }}
        onClick={onCurate}
      >
        ★ Curate
      </button>

      {/* Delete button */}
      <button
        style={{
          ...styles.bulkBtn,
          ...styles.bulkBtnDanger
        }}
        onClick={onDelete}
      >
        🗑 Delete
      </button>

      {/* Clear selection */}
      <button
        style={styles.bulkBtn}
        onClick={onClear}
      >
        ✕ Clear
      </button>
    </div>
  );
}

export default BulkBar;
