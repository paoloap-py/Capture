// Design tokens
export const colors = {
  bg: '#0A0A0B',
  card: '#141416',
  cardBorder: '#1E1E22',
  accent: '#FF6B35',
  text: '#E5E5E5',
  textMuted: '#888888',
  textDim: '#666666',
  curatedStar: '#FFD166',
  success: '#00C49A',
  error: '#FF4444'
};

// Base styles
export const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    paddingBottom: '120px'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },

  title: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: '48px',
    fontWeight: 'normal',
    color: colors.text,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },

  titleAccent: {
    color: colors.accent
  },

  headerButtons: {
    display: 'flex',
    gap: '8px'
  },

  iconButton: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '8px',
    padding: '10px 12px',
    cursor: 'pointer',
    color: colors.textMuted,
    fontSize: '16px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  iconButtonActive: {
    color: colors.success,
    borderColor: colors.success
  },

  // Add link form
  addForm: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },

  input: {
    flex: 1,
    minWidth: '200px',
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '8px',
    padding: '12px 16px',
    color: colors.text,
    fontFamily: "'DM Mono', monospace",
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },

  select: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '8px',
    padding: '12px 16px',
    color: colors.text,
    fontFamily: "'DM Mono', monospace",
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },

  button: {
    background: colors.accent,
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    color: '#fff',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },

  buttonSecondary: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '8px',
    padding: '12px 24px',
    color: colors.text,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  // Search
  searchBar: {
    width: '100%',
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '8px',
    padding: '12px 16px',
    color: colors.text,
    fontFamily: "'DM Mono', monospace",
    fontSize: '14px',
    marginBottom: '16px',
    outline: 'none'
  },

  // Filter bar
  filterBar: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },

  filterTab: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '20px',
    padding: '8px 16px',
    color: colors.textMuted,
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  filterTabActive: {
    borderColor: colors.accent,
    color: colors.text
  },

  filterCount: {
    background: colors.cardBorder,
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '11px',
    color: colors.textMuted
  },

  // Format filters
  formatFilters: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },

  formatFilterBtn: {
    background: 'transparent',
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '16px',
    padding: '6px 12px',
    color: colors.textMuted,
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  // Link card
  linkCard: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    animation: 'fadeSlideIn 0.3s ease',
    transition: 'border-color 0.2s ease'
  },

  linkCardSelected: {
    borderColor: colors.accent
  },

  linkHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '8px'
  },

  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: colors.accent
  },

  linkTitle: {
    flex: 1,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    color: colors.text,
    lineHeight: 1.4
  },

  linkTitleInput: {
    flex: 1,
    background: 'transparent',
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '4px',
    padding: '4px 8px',
    color: colors.text,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    outline: 'none'
  },

  curateButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px',
    transition: 'transform 0.2s ease'
  },

  linkUrl: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    color: colors.textMuted,
    marginBottom: '12px',
    wordBreak: 'break-all'
  },

  linkUrlInput: {
    width: '100%',
    background: 'transparent',
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '4px',
    padding: '4px 8px',
    color: colors.textMuted,
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    outline: 'none',
    marginBottom: '12px'
  },

  linkFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },

  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },

  formatBadges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },

  formatBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },

  linkActions: {
    display: 'flex',
    gap: '8px'
  },

  actionBtn: {
    background: 'transparent',
    border: 'none',
    color: colors.textMuted,
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    transition: 'color 0.2s ease'
  },

  // Bulk action bar
  bulkBar: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '12px',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    animation: 'panelIn 0.2s ease',
    zIndex: 100
  },

  bulkCount: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    color: colors.text,
    fontWeight: '500'
  },

  bulkBtn: {
    background: colors.cardBorder,
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    color: colors.text,
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  },

  bulkBtnDanger: {
    background: '#441111',
    color: '#FF6666'
  },

  // Settings panel
  settingsPanel: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    animation: 'panelIn 0.2s ease'
  },

  settingsTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '16px'
  },

  settingsRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  settingsLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: colors.textMuted,
    minWidth: '100px'
  },

  syncStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px'
  },

  syncStatusSyncing: {
    color: colors.textMuted,
    animation: 'pulse 1s infinite'
  },

  syncStatusSynced: {
    color: colors.success
  },

  syncStatusError: {
    color: colors.error
  },

  // Category manager
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px'
  },

  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    background: colors.cardBorder,
    borderRadius: '8px'
  },

  categoryEmoji: {
    fontSize: '16px'
  },

  categoryName: {
    flex: 1,
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: colors.text
  },

  categoryColor: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  },

  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: colors.textMuted,
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px'
  },

  // Empty state
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: colors.textMuted
  },

  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },

  emptyText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '16px'
  }
};
