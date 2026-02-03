import { GIST_CONFIG } from './constants';

/**
 * Sync data to GitHub Gist
 * @param {string} token - GitHub PAT with gist scope
 * @param {Object} data - Data to sync { links, categories, lastSync, count }
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function syncToGist(token, data) {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_CONFIG.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify({
        files: {
          [GIST_CONFIG.filename]: {
            content: JSON.stringify(data, null, 2)
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP ${response.status}`;
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Fetch data from GitHub Gist
 * @param {string} token - GitHub PAT with gist scope
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function fetchFromGist(token) {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_CONFIG.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP ${response.status}`;
      return { success: false, error: errorMessage };
    }

    const gist = await response.json();
    const file = gist.files[GIST_CONFIG.filename];

    if (!file) {
      // No data file in gist yet - that's okay, we'll create it on first sync
      return { success: true, data: null };
    }

    const data = JSON.parse(file.content);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Create a debounced sync function
 * @param {Function} syncFn - The sync function to debounce
 * @param {number} delay - Debounce delay in ms (default 1500)
 * @returns {Function} Debounced sync function
 */
export function createDebouncedSync(syncFn, delay = 1500) {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      syncFn(...args);
      timeoutId = null;
    }, delay);
  };
}
