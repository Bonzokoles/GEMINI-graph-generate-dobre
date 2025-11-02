import { useState, useEffect, useCallback } from 'react';

// Mock window.aistudio for environments where it's not defined
if (typeof window !== 'undefined' && !(window as any).aistudio) {
  (window as any).aistudio = {
    // FIX: Add generic type <boolean> to Promise to correctly type the resolve function.
    hasSelectedApiKey: () => new Promise<boolean>(resolve => setTimeout(() => resolve(false), 500)),
    // FIX: Add generic type <void> to Promise to correctly type the resolve function for a promise that resolves with no value. This fixes the error on line 10.
    openSelectKey: () => new Promise<void>(resolve => {
        console.log("Mock 'openSelectKey' called. Simulating successful key selection.");
        setTimeout(() => resolve(), 500);
    }),
  };
}


export const useVeoApiKey = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkApiKey = useCallback(async () => {
    setIsChecking(true);
    try {
      const result = await (window as any).aistudio.hasSelectedApiKey();
      setHasApiKey(result);
    } catch (error) {
      console.error("Error checking for API key:", error);
      setHasApiKey(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const selectApiKey = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      // Assume success after opening dialog to avoid race conditions.
      setHasApiKey(true);
    } catch (error) {
      console.error("Error opening API key selection:", error);
      setHasApiKey(false);
    }
  };

  const resetApiKey = useCallback(() => {
      setHasApiKey(false);
  }, []);

  return { hasApiKey, isChecking, selectApiKey, resetApiKey };
};
