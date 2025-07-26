"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Constants
const COOKIE_NAME = "themeColor";
const FALLBACK_COLOR = "#000";
const COOKIE_MAX_AGE = 60 * 60 * ; // 1 day

// Utility functions
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] ?? null;
}

function setCookie(name: string, value: string, maxAge?: number): void {
  const isDevelopment = window.location.hostname === "localhost";
  let cookieString = `${name}=${value}; path=/; SameSite=Lax`;

  if (!isDevelopment && maxAge) {
    cookieString += `; max-age=${maxAge}`;
  }

  document.cookie = cookieString;
}

function applyThemeColor(color: string): void {
  document.documentElement.style.setProperty("--primary", color);
}

function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || ""
  );
}

// Custom hook for theme management
function useThemeColor() {
  const baseUrl = getApiBaseUrl();

  const { data, error } = useQuery({
    queryKey: ["themeColor"],
    queryFn: async () => {
      if (!baseUrl) {
        throw new Error("API base URL not configured");
      }

      const response = await fetch(`${baseUrl}/color/colors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    enabled: !!baseUrl,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return { data, error, baseUrl };
}

export function ColorFetcher() {
  const { data, error } = useThemeColor();

  useEffect(() => {
    // Check for existing color first
    const existingColor = getCookie(COOKIE_NAME);

    if (existingColor) {
      applyThemeColor(existingColor);
      return;
    }

    // Handle successful data fetch
    if (data?.status && data.data?.[0]?.colorCode) {
      const colorCode = data.data[0].colorCode;
      setCookie(COOKIE_NAME, colorCode, COOKIE_MAX_AGE);
      applyThemeColor(colorCode);
      return;
    }

    // Handle error case
    if (error) {
      setCookie(COOKIE_NAME, FALLBACK_COLOR, COOKIE_MAX_AGE);
      applyThemeColor(FALLBACK_COLOR);
    }
  }, [data, error]);

  return null;
}

// Alternative implementation if you need the reload behavior
export function ThemeFetcher() {
  const { data } = useQuery({
    queryKey: ["themeColor"],
    queryFn: async () => {
      const baseUrl = getApiBaseUrl();
      if (!baseUrl) throw new Error("API base URL not configured");

      const res = await fetch(`${baseUrl}/color/colors`);
      if (!res.ok) throw new Error("Failed to fetch theme color");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data?.themeColor) return;

    const existing = getCookie(COOKIE_NAME);

    if (existing !== data.themeColor) {
      setCookie(COOKIE_NAME, data.themeColor);
      // Force refresh for SSR consistency
      window.location.reload();
    } else {
      applyThemeColor(data.themeColor);
    }
  }, [data]);

  return null;
}
