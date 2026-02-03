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
export const SEED_VERSION = 6;
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
// - adapt/remix → controversial
// - think-pieces → opinion-prediction
export const SEED_LINKS = [
  {
    id: 'seed-1',
    url: 'https://github.com/langchain-ai/deepagents',
    title: 'Deep Agents — LangChain/LangGraph Agent Harness',
    category: 'controversial',
    formats: ['linkedin', 'medium', 'tools'],
    curated: false,
    createdAt: Date.now() - 18 * 86400000
  },
  {
    id: 'seed-2',
    url: 'https://notepad-plus-plus.org/news/hijacked-incident-info-update/',
    title: 'Notepad++ Hijacked by State-Sponsored Hackers',
    category: 'controversial',
    formats: ['linkedin'],
    curated: true,
    createdAt: Date.now() - 17 * 86400000
  },
  {
    id: 'seed-3',
    url: 'https://www.reddit.com/r/artificial/comments/1qqdmoq/moltbot_is_exploding_100k_github_stars_in_weeks/',
    title: 'OpenClaw (Moltbot) Explodes to 100K+ GitHub Stars',
    category: 'trending-viral',
    formats: ['linkedin'],
    curated: true,
    createdAt: Date.now() - 16 * 86400000
  },
  {
    id: 'seed-4',
    url: 'https://www.reddit.com/r/Python/comments/1qqq872/python_crash_course_notebook_for_data_engineering/',
    title: 'Python Crash Course Notebook for Data Engineering → Adapt for AI Engineers',
    category: 'controversial',
    formats: ['medium'],
    curated: true,
    createdAt: Date.now() - 15 * 86400000
  },
  {
    id: 'seed-5',
    url: 'https://martinalderson.com/posts/two-kinds-of-ai-users-are-emerging/',
    title: 'Two Kinds of AI Users Are Emerging — The Gap Is Astonishing',
    category: 'opinion-prediction',
    formats: ['linkedin', 'medium'],
    curated: true,
    createdAt: Date.now() - 14 * 86400000
  },
  {
    id: 'seed-6',
    url: 'https://www.linkedin.com/posts/andreashorn1_%F0%9D%97%96%F0%9D%97%B9%F0%9D%97%AE%F0%9D%98%82%F0%9D%97%B1%F0%9D%97%B2-%F0%9D%97%96%F0%9D%97%BC%F0%9D%97%B1%F0%9D%97%B2-%F0%9D%97%BC%F0%9D%97%BB-%F0%9D%98%80%F0%9D%98%81%F0%9D%97%B2%F0%9D%97%BF%F0%9D%97%BC%F0%9D%97%B6%F0%9D%97%B1-activity-7423277641064955904-vkxU',
    title: 'Andreas Horn — Claude Code on Steroid',
    category: 'tools-workflows',
    formats: ['linkedin'],
    curated: true,
    createdAt: Date.now() - 13 * 86400000
  },
  {
    id: 'seed-7',
    url: 'https://www.linkedin.com/posts/sebastianraschka_its-been-a-while-since-i-did-an-llm-architecture-activity-7422670592077668352-T0hU',
    title: 'Sebastian Raschka — The Big LLM Architecture Comparison (11 Models of 2025)',
    category: 'tools-workflows',
    formats: ['linkedin', 'medium'],
    curated: true,
    createdAt: Date.now() - 12 * 86400000
  },
  {
    id: 'seed-8',
    url: 'https://www.linkedin.com/posts/searchguy_softwarearchitecture-antigravity-gemini-activity-7422885766323650561-c5eX',
    title: 'SearchGuy — Software Architecture with Google Antigravity + Gemini',
    category: 'tools-workflows',
    formats: ['linkedin'],
    curated: true,
    createdAt: Date.now() - 11 * 86400000
  },
  {
    id: 'seed-9',
    url: 'https://www.linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4',
    title: 'Addy Osmani — Context Engineering & LLM Coding Workflow for 2026',
    category: 'controversial',
    formats: ['linkedin', 'medium'],
    curated: true,
    createdAt: Date.now() - 10 * 86400000
  },
  {
    id: 'seed-10',
    url: 'https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools',
    title: 'Vercel — We Removed 80% of Our Agent\'s Tools (and It Got Better)',
    category: 'controversial',
    formats: [],
    curated: true,
    createdAt: Date.now() - 9 * 86400000
  },
  {
    id: 'seed-11',
    url: 'https://www.linkedin.com/posts/ashpreetbedi_dash-open-sourcing-openais-in-house-data-share-7424097870993141760-HHTC',
    title: 'Dash — Open-Sourcing OpenAI\'s In-House Data Agent',
    category: 'tools-workflows',
    formats: [],
    curated: true,
    createdAt: Date.now() - 8 * 86400000
  },
  {
    id: 'seed-12',
    url: 'https://www.linkedin.com/posts/kavishka-abeywardana-01b891214_neurips-2025-best-paper-gated-attention-share-7423710303961444352-KIO0',
    title: 'NeurIPS 2025 Best Paper — Gated Attention for LLMs',
    category: 'tools-workflows',
    formats: [],
    curated: true,
    createdAt: Date.now() - 7 * 86400000
  },
  {
    id: 'seed-13',
    url: 'https://www.linkedin.com/posts/michaelhoogkamer_policyasgraph-datagovernance-ai-share-7423702462160797696-b78J',
    title: 'Policy-as-Graph — Data Governance Case Study',
    category: 'controversial',
    formats: ['linkedin', 'case-study'],
    curated: true,
    createdAt: Date.now() - 6 * 86400000
  },
  {
    id: 'seed-14',
    url: 'https://www.linkedin.com/posts/simeon-emanuilov_gliner2-extracts-structured-data-without-share-7422520829768327169-6RDv',
    title: 'GLiNER2 — Structured Data Extraction Without LLMs',
    category: 'tools-workflows',
    formats: ['linkedin', 'tools'],
    curated: true,
    createdAt: Date.now() - 5 * 86400000
  },
  {
    id: 'seed-15',
    url: 'https://www.linkedin.com/posts/debeurre_inside-openais-in-house-data-agent-activity-7424150096453197824-1tJf',
    title: 'Inside OpenAI\'s In-House Data Agent — Breakdown',
    category: 'tools-workflows',
    formats: ['linkedin', 'medium'],
    curated: true,
    createdAt: Date.now() - 4 * 86400000
  },
  {
    id: 'seed-16',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7423378505998106624',
    title: 'The Real Engineering Skill — Knowing When to Take the AI Handoff',
    category: 'opinion-prediction',
    formats: ['linkedin', 'opinion'],
    curated: true,
    createdAt: Date.now() - 3 * 86400000
  },
  {
    id: 'seed-17',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7403864074851442688',
    title: 'Gemini Day 2 — When to Graduate from AI Studio to Vertex AI',
    category: 'controversial',
    formats: ['linkedin'],
    curated: true,
    createdAt: Date.now() - 2 * 86400000
  },
  {
    id: 'seed-18',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7421205567739740161',
    title: 'LinkedIn Tool Post',
    category: 'tools-workflows',
    formats: ['linkedin'],
    curated: false,
    createdAt: Date.now() - 1 * 86400000
  }
];
