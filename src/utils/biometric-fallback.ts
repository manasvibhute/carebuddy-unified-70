// Fallback types for web platform when biometric plugin is not available
export enum BiometryType {
  TOUCH_ID = 'touchId',
  FACE_ID = 'faceId',
  FINGERPRINT = 'fingerprint',
  FACE_AUTHENTICATION = 'face',
  IRIS_AUTHENTICATION = 'iris',
  MULTIPLE = 'multiple'
}

export const NativeBiometric = {
  isAvailable: () => Promise.resolve({
    isAvailable: true,
    biometryType: BiometryType.FINGERPRINT
  }),
  
  verifyIdentity: ({ reason }: { reason: string }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock 70% success rate for web testing
        if (Math.random() > 0.3) {
          resolve({ success: true });
        } else {
          reject(new Error('Biometric authentication failed'));
        }
      }, 1500);
    });
  }
};