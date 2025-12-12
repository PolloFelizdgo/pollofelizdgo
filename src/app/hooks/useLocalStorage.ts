"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook para manejar localStorage con TypeScript
 * @param key - Clave del localStorage
 * @param initialValue - Valor inicial si no existe
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar valor del localStorage al montar
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
      setIsLoaded(true);
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      setIsLoaded(true);
    }
  }, [key]);

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Función para eliminar el valor
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue, isLoaded] as const;
}
