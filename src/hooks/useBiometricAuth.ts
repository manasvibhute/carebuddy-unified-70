import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { BiometryType } from '@/utils/biometric-fallback';

interface BiometricAuthResult {
  success: boolean;
  error?: string;
  fallback?: boolean;
}

export const useBiometricAuth = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<BiometryType | null>(null);
  const [NativeBiometric, setNativeBiometric] = useState<any>(null);

  useEffect(() => {
    initializeBiometric();
  }, []);

  const initializeBiometric = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Try to load the actual plugin
        const { NativeBiometric: RealNativeBiometric } = await import('@capgo/capacitor-native-biometric');
        setNativeBiometric(RealNativeBiometric);
      } else {
        // Use fallback for web
        const { NativeBiometric: FallbackNativeBiometric } = await import('@/utils/biometric-fallback');
        setNativeBiometric(FallbackNativeBiometric);
      }
      checkBiometricAvailability();
    } catch (error) {
      console.log('Failed to load biometric plugin, using fallback:', error);
      const { NativeBiometric: FallbackNativeBiometric } = await import('@/utils/biometric-fallback');
      setNativeBiometric(FallbackNativeBiometric);
      checkBiometricAvailability();
    }
  };

  const checkBiometricAvailability = async () => {
    if (!NativeBiometric) return;

    if (!Capacitor.isNativePlatform()) {
      // Web platform - mock availability for testing
      setIsAvailable(true);
      setBiometryType(BiometryType.FINGERPRINT);
      return;
    }

    try {
      const result = await NativeBiometric.isAvailable();
      setIsAvailable(result.isAvailable);
      setBiometryType(result.biometryType);
    } catch (error) {
      console.log('Biometric not available:', error);
      setIsAvailable(false);
    }
  };

  const authenticate = async (reason: string = 'Please verify your identity'): Promise<BiometricAuthResult> => {
    if (!NativeBiometric) {
      return {
        success: false,
        error: 'Biometric service not initialized',
        fallback: true
      };
    }

    if (!Capacitor.isNativePlatform()) {
      // Mock authentication for web platform
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate 70% success rate for testing
          const mockSuccess = Math.random() > 0.3;
          resolve({
            success: mockSuccess,
            error: mockSuccess ? undefined : 'Mock biometric authentication failed',
            fallback: !mockSuccess
          });
        }, 1500);
      });
    }

    if (!isAvailable) {
      return {
        success: false,
        error: 'Biometric authentication not available',
        fallback: true
      };
    }

    try {
      await NativeBiometric.verifyIdentity({
        reason,
        title: 'Biometric Authentication',
        subtitle: 'Authenticate to access your account',
        description: reason
      });

      return { success: true };
    } catch (error: any) {
      console.log('Biometric authentication failed:', error);
      
      // Check if user cancelled or if there was an error
      const errorMessage = error?.message || 'Authentication failed';
      const shouldFallback = errorMessage.includes('cancelled') || 
                           errorMessage.includes('failed') ||
                           errorMessage.includes('not available');

      return {
        success: false,
        error: errorMessage,
        fallback: shouldFallback
      };
    }
  };

  const getBiometryTypeName = (): string => {
    switch (biometryType) {
      case BiometryType.TOUCH_ID:
        return 'Touch ID';
      case BiometryType.FACE_ID:
        return 'Face ID';
      case BiometryType.FINGERPRINT:
        return 'Fingerprint';
      case BiometryType.FACE_AUTHENTICATION:
        return 'Face Authentication';
      case BiometryType.IRIS_AUTHENTICATION:
        return 'Iris Authentication';
      default:
        return 'Biometric Authentication';
    }
  };

  return {
    isAvailable,
    biometryType,
    authenticate,
    getBiometryTypeName,
    checkBiometricAvailability
  };
};