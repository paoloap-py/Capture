import React from 'react';
import { FORMATS } from '../constants';
import { styles, colors } from '../styles';

// SVG icons for LinkedIn and Medium (smaller for filter bar)
const LinkedInIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MediumIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

function FilterBar({
  categories,
  categoryFilter,
  onCategoryFilter,
  categoryCounts,
  formatFilter,
  onFormatFilter,
  formatCounts,
  curatedFilter,
  onCuratedFilter
}) {
  const getFormatIcon = (format) => {
    if (format.icon === 'linkedin') return <LinkedInIcon />;
    if (format.icon === 'medium') return <MediumIcon />;
    return format.icon;
  };

  return (
    <>
      {/* Category filters */}
      <div style={styles.filterBar}>
        <button
          style={{
            ...styles.filterTab,
            ...(categoryFilter === 'all' ? styles.filterTabActive : {})
          }}
          onClick={() => onCategoryFilter('all')}
        >
          All
          <span style={styles.filterCount}>{categoryCounts.all}</span>
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            style={{
              ...styles.filterTab,
              ...(categoryFilter === cat.id ? {
                ...styles.filterTabActive,
                borderColor: cat.color,
                color: cat.color
              } : {})
            }}
            onClick={() => onCategoryFilter(cat.id)}
          >
            {cat.emoji} {cat.name}
            <span style={styles.filterCount}>{categoryCounts[cat.id] || 0}</span>
          </button>
        ))}
      </div>

      {/* Format filters */}
      <div style={styles.formatFilters}>
        {FORMATS.map(format => (
          <button
            key={format.id}
            style={{
              ...styles.formatFilterBtn,
              ...(formatFilter === format.id ? {
                borderColor: format.color,
                color: format.color,
                background: `${format.color}11`
              } : {})
            }}
            onClick={() => onFormatFilter(formatFilter === format.id ? null : format.id)}
          >
            {getFormatIcon(format)}
            <span>{format.name}</span>
            <span style={{ opacity: 0.6 }}>{formatCounts[format.id] || 0}</span>
          </button>
        ))}

        {/* Curated filter */}
        <button
          style={{
            ...styles.formatFilterBtn,
            ...(curatedFilter ? {
              borderColor: colors.curatedStar,
              color: colors.curatedStar,
              background: `${colors.curatedStar}11`
            } : {})
          }}
          onClick={() => onCuratedFilter(!curatedFilter)}
        >
          ★ Curated
          <span style={{ opacity: 0.6 }}>{formatCounts.curated || 0}</span>
        </button>
      </div>
    </>
  );
}

export default FilterBar;
