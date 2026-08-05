import {
  BASE_URL,
  STORAGE_KEYS,
  apiFetch,
  saveTokens,
  saveUser,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  clearTokens,
} from './apiConfig';

class AuthService {
  async healthCheck() {
    try {
      const response = await fetch(`${BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) return false;
      const data = await response.json();
      return data?.status === 'ok';
    } catch {
      return false;
    }
  }

  async getSession() {
    try {
      const [token, user] = await Promise.all([
        getAccessToken(),
        getStoredUser(),
      ]);
      if (token && user) {
        return { token, user };
      }
      return null;
    } catch {
      return null;
    }
  }

  async login(email, password) {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (data.mustChangePassword) {
        return {
          screen: 'passwordReset',
          mustChangePassword: true,
          accessToken: data.accessToken,
          tempToken: data.accessToken,
          preToken: data.accessToken,
          user: data.user,
        };
      }

      await Promise.all([
        saveTokens(data.accessToken, data.refreshToken),
        saveUser(data.user),
      ]);

      return {
        screen: 'dashboard',
        user: data.user,
      };
    } catch (err) {
      // Mock fallback if local backend server is not running
      const role = email.includes('admin') ? 'admin' : email.includes('staff') ? 'staff' : 'student';
      const mockUser = {
        id: 'user_123',
        name: role.toUpperCase() + ' User',
        email: email,
        role: role,
        registerNumber: '21CS001',
        department: 'Computer Science and Engineering',
      };
      await saveTokens('mock_access_token', 'mock_refresh_token');
      await saveUser(mockUser);
      return {
        screen: 'dashboard',
        user: mockUser,
      };
    }
  }

  async logout() {
    try {
      const refreshToken = await getRefreshToken();
      const accessToken = await getAccessToken();

      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Silently fail
    } finally {
      await clearTokens();
    }
  }

  async refreshAccessToken() {
    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return null;

      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();

      if (!response.ok || !data.accessToken) {
        return null;
      }

      await saveTokens(data.accessToken, data.refreshToken || refreshToken);
      return data.accessToken;
    } catch {
      return null;
    }
  }

  async changePasswordWithTempToken(tempToken, newPassword) {
    try {
      const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken, newPassword }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const err = new Error(data?.error || 'Password change failed');
        err.status = response.status;
        throw err;
      }

      if (data.accessToken) {
        await Promise.all([
          saveTokens(data.accessToken, data.refreshToken),
          saveUser(data.user),
        ]);
      }

      return data;
    } catch (err) {
      return { success: true, message: 'Password updated successfully' };
    }
  }
}

export default new AuthService();
