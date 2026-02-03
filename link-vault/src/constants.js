// Storage keys
export const STORAGE_KEYS = {
  DATA: 'linkvault-data',
  SEED_VERSION: 'linkvault-seed-version',
  CAT_VERSION: 'linkvault-cat-version',
  GH_TOKEN: 'linkvault-gh-token'
};

// Gist configuration
export const GIST_CONFIG = {
  id: '7dcd89e3861f31cf394da68b5e35c302',
  owner: 'paoloap-py',
  filename: 'linkvault-data.json'
};

// Current versions for seed management
export const SEED_VERSION = 2;
export const CAT_VERSION = 1;

// Default categories
export const DEFAULT_CATEGORIES = [
  { id: 'controversial', name: 'Controversial', emoji: '🔥', color: '#FF6B35' },
  { id: 'tools-workflows', name: 'Tools & Workflows', emoji: '⚙️', color: '#00C49A' },
  { id: 'opinion-prediction', name: 'Opinion / Prediction', emoji: '🧠', color: '#7B61FF' },
  { id: 'trending-viral', name: 'Trending / Viral', emoji: '📈', color: '#FF3CAC' }
];

// Format tags with icons
export const FORMATS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: 'linkedin'
  },
  {
    id: 'medium',
    name: 'Medium',
    color: '#00AB6C',
    icon: 'medium'
  },
  {
    id: 'case-study',
    name: 'Case Study',
    color: '#F59E0B',
    icon: '📓'
  },
  {
    id: 'opinion',
    name: 'Opinion',
    color: '#A78BFA',
    icon: '💡'
  },
  {
    id: 'tools',
    name: 'Tools',
    color: '#34D399',
    icon: '🔧'
  }
];

// Seed links with category migrations applied
// - security links → controversial
// - reference links → tools-workflows
// - adapt → controversial
// - think-pieces → opinion-prediction
export const SEED_LINKS = [
  {
    id: 'seed-1',
    url: 'https://arstechnica.com/security/2024/03/hackers-are-weaponizing-notepad/',
    title: 'Hackers are weaponizing Notepad++ to spread malware',
    category: 'controversial',
    formats: ['linkedin'],
    curated: false,
    createdAt: Date.now() - 17 * 86400000
  },
  {
    id: 'seed-2',
    url: 'https://www.theverge.com/2024/3/ai-chatbots-making-things-up',
    title: 'AI chatbots are still confidently making things up',
    category: 'controversial',
    formats: ['opinion'],
    curated: false,
    createdAt: Date.now() - 16 * 86400000
  },
  {
    id: 'seed-3',
    url: 'https://techcrunch.com/2024/03/remote-work-productivity-myth/',
    title: 'The remote work productivity myth needs to die',
    category: 'controversial',
    formats: ['linkedin', 'opinion'],
    curated: false,
    createdAt: Date.now() - 15 * 86400000
  },
  {
    id: 'seed-4',
    url: 'https://www.notion.so/templates/ai-content-pipeline',
    title: 'AI Content Pipeline Template for Notion',
    category: 'tools-workflows',
    formats: ['tools'],
    curated: false,
    createdAt: Date.now() - 14 * 86400000
  },
  {
    id: 'seed-5',
    url: 'https://www.cursor.com/blog/ai-coding-workflows',
    title: 'How we use Cursor AI for 10x coding productivity',
    category: 'tools-workflows',
    formats: ['tools', 'case-study'],
    curated: false,
    createdAt: Date.now() - 13 * 86400000
  },
  {
    id: 'seed-6',
    url: 'https://lilianweng.github.io/posts/2023-06-23-agent/',
    title: 'LLM Powered Autonomous Agents - Lilian Weng',
    category: 'tools-workflows',
    formats: ['tools'],
    curated: false,
    createdAt: Date.now() - 12 * 86400000
  },
  {
    id: 'seed-7',
    url: 'https://www.wired.com/story/ai-will-replace-middle-management/',
    title: 'AI will replace middle management before it replaces workers',
    category: 'opinion-prediction',
    formats: ['linkedin', 'opinion'],
    curated: false,
    createdAt: Date.now() - 11 * 86400000
  },
  {
    id: 'seed-8',
    url: 'https://www.fastcompany.com/2024/03/the-death-of-the-entry-level-job/',
    title: 'The death of the entry-level job is here',
    category: 'opinion-prediction',
    formats: ['opinion'],
    curated: false,
    createdAt: Date.now() - 10 * 86400000
  },
  {
    id: 'seed-9',
    url: 'https://oneusefulthing.substack.com/p/the-homework-apocalypse',
    title: 'The Homework Apocalypse - Ethan Mollick',
    category: 'opinion-prediction',
    formats: ['medium', 'opinion'],
    curated: false,
    createdAt: Date.now() - 9 * 86400000
  },
  {
    id: 'seed-10',
    url: 'https://www.tiktok.com/@levelsio/video/12345',
    title: 'Levels.io builds $1M SaaS in 30 days with AI',
    category: 'trending-viral',
    formats: ['case-study'],
    curated: false,
    createdAt: Date.now() - 8 * 86400000
  },
  {
    id: 'seed-11',
    url: 'https://arxiv.org/abs/2312.00001',
    title: 'NeurIPS 2023 Best Paper: Scaling Laws for AI',
    category: 'tools-workflows',
    formats: ['tools'],
    curated: false,
    createdAt: Date.now() - 7 * 86400000
  },
  {
    id: 'seed-12',
    url: 'https://twitter.com/sama/status/12345',
    title: 'Sam Altman: GPT-5 will be the last model before AGI',
    category: 'trending-viral',
    formats: ['opinion'],
    curated: false,
    createdAt: Date.now() - 6 * 86400000
  },
  {
    id: 'seed-13',
    url: 'https://www.linkedin.com/posts/justinwelsh_content-creator-activity-12345',
    title: 'Justin Welsh: How I built a $5M one-person business',
    category: 'trending-viral',
    formats: ['linkedin', 'case-study'],
    curated: false,
    createdAt: Date.now() - 5 * 86400000
  },
  {
    id: 'seed-14',
    url: 'https://openai.com/research/data-agents',
    title: 'OpenAI Data Agents: Autonomous Data Analysis',
    category: 'tools-workflows',
    formats: ['tools'],
    curated: false,
    createdAt: Date.now() - 4 * 86400000
  },
  {
    id: 'seed-15',
    url: 'https://www.youtube.com/watch?v=abc123',
    title: 'Why senior developers are mass quitting (viral thread)',
    category: 'trending-viral',
    formats: ['opinion'],
    curated: false,
    createdAt: Date.now() - 3 * 86400000
  },
  {
    id: 'seed-16',
    url: 'https://hbr.org/2024/03/why-ai-projects-fail',
    title: 'Why 85% of AI Projects Fail - Harvard Business Review',
    category: 'controversial',
    formats: ['case-study', 'opinion'],
    curated: false,
    createdAt: Date.now() - 2 * 86400000
  },
  {
    id: 'seed-17',
    url: 'https://www.raycast.com/blog/ai-extensions-tutorial',
    title: 'Building AI Extensions for Raycast',
    category: 'tools-workflows',
    formats: ['tools'],
    curated: false,
    createdAt: Date.now() - 1 * 86400000
  },
  {
    id: 'seed-18',
    url: 'https://stratechery.com/2024/the-ai-productivity-paradox/',
    title: 'The AI Productivity Paradox - Ben Thompson',
    category: 'opinion-prediction',
    formats: ['medium', 'opinion'],
    curated: false,
    createdAt: Date.now()
  }
];
