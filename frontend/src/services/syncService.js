import { apiFetch } from './apiConfig';

const CACHE_KEYS = {
  DEVICE_ID: '@focussync:deviceId',
  POLICY_VERSION: '@focussync:policyVersion',
};

class SyncService {
  isSyncing = false;

  async sync(syncType = 'periodic') {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const browserInfo = {
        platform: 'web',
        osVersion: navigator.userAgent || 'Web Browser',
        appVersion: '1.0.0 Web',
        deviceModel: 'Web Controller',
        deviceId: 'web_device_' + Math.random().toString(36).substr(2, 9),
      };

      const registrationPayload = {
        fcmToken: 'web_fcm_token',
        deviceInfo: browserInfo,
      };

      const registerRes = await apiFetch('/student/device/register', {
        method: 'POST',
        body: JSON.stringify(registrationPayload),
      }).catch(() => ({ deviceId: browserInfo.deviceId }));

      const serverDeviceId = registerRes.deviceId || browserInfo.deviceId;
      if (serverDeviceId) {
        localStorage.setItem(CACHE_KEYS.DEVICE_ID, serverDeviceId);
      }
    } catch (error) {
      console.warn('FocusSync Web: Background Synchronization notice:', error.message);
    } finally {
      this.isSyncing = false;
    }
  }

  async checkPermissions() {
    return { accessibilityEnabled: true, overlayEnabled: true };
  }

  openAccessibilitySettings() {
    console.log('Web Edition: Accessibility settings controlled via browser permissions');
  }

  openOverlaySettings() {
    console.log('Web Edition: Overlay settings controlled via browser permissions');
  }

  async reportBlockedAttempt(packageName, appName, policyVersion) {
    try {
      const serverDeviceId = localStorage.getItem(CACHE_KEYS.DEVICE_ID);
      if (!serverDeviceId) return;

      await apiFetch('/student/blocked-attempt', {
        method: 'POST',
        body: JSON.stringify({
          packageName,
          appName: appName || '',
          policyVersion: policyVersion || 1,
          attemptedAt: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.warn('FocusSync: Blocked attempt logging notice:', error.message);
    }
  }
}

export default new SyncService();
