import {
  BASE_URL,
  apiFetch,
  getRefreshToken,
  saveTokens,
} from './apiConfig';

const fetchWithRefresh = async (path, options = {}) => {
  try {
    return await apiFetch(path, options);
  } catch (err) {
    if (err.status === 401 && err.data?.tokenExpired) {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) throw err;

      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) throw err;

      const refreshData = await refreshRes.json();
      if (!refreshData.accessToken) throw err;

      await saveTokens(refreshData.accessToken, refreshData.refreshToken || refreshToken);

      return await apiFetch(path, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
      });
    }
    throw err;
  }
};

export const fetchDashboard = async () => {
  return fetchWithRefresh('/student/dashboard');
};

export const fetchApps = async () => {
  return fetchWithRefresh('/student/apps');
};

export const fetchNotifications = async () => {
  return fetchWithRefresh('/student/notifications');
};

export const fetchUnreadCount = async () => {
  return fetchWithRefresh('/student/notifications/unread-count');
};

export const markNotificationRead = async (id) => {
  return fetchWithRefresh(`/student/notifications/${id}/read`, {
    method: 'POST',
  });
};

export default {
  fetchDashboard,
  fetchApps,
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
};
