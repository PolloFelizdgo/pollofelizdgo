"use client";

import { useState } from 'react';

interface JotFormSubmission {
  [key: string]: any;
}

export function useJotForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitToJotForm = async (data: JotFormSubmission) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jotform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit',
          data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to JotForm');
      }

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const getSubmissions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jotform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getSubmissions',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get submissions');
      }

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const getFormInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jotform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getForm',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get form info');
      }

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const checkConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jotform');

      if (!response.ok) {
        throw new Error('JotForm connection failed');
      }

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  return {
    submitToJotForm,
    getSubmissions,
    getFormInfo,
    checkConnection,
    loading,
    error,
  };
}
