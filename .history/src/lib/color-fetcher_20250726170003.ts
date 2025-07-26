/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function setThemeCookie(colorCode) {
  const isDevelopment = window.location.hostname === "localhost";
  let cookieString = `themeColor=${colorCode}; path=/; SameSite=Lax`;

  if (!isDevelopment) {
    // In production, persist for 1 day
    cookieString += `; max-age=${60 * 60 * 24}`;
  }
  // In development, use session cookie for easier testing

  document.cookie = cookieString;
}

export function ColorFetcher() {
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          process.env.NEXT_PUBLIC_API_URL;

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

        const data = await response.json();

        if (data.status && data.data && data.data.length > 0) {
          const colorCode = data.data[0].colorCode; // colorCode is now a string, not array

          // Set the color in cookies
        setThemeCookie()

          // Update CSS custom property immediately
          document.documentElement.style.setProperty("--primary", colorCode);
        }
      } catch (error) {
        // Apply fallback color on error
        const fallbackColor = "#000";
        document.cookie = `themeColor=${fallbackColor}; path=/; max-age=${
          60 * 60 * 24
        }; SameSite=Lax`;
        document.documentElement.style.setProperty("--primary", fallbackColor);
      }
    };

    // Check if color is already in cookies
    const existingColor = document.cookie
      .split("; ")
      .find((row) => row.startsWith("themeColor="))
      ?.split("=")[1];

    if (existingColor) {
      // Apply existing color immediately
      document.documentElement.style.setProperty("--primary", existingColor);
    } else {
      // Fetch new color if not in cookies
      fetchColors();
    }
  }, []);

  return null;
}

export function ThemeFetcher() {
  const { data } = useQuery({
    queryKey: ["themeColor"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/color/colors`
      );
      if (!res.ok) throw new Error("Failed to fetch theme color");
      return res.json();
    },
  });

  useEffect(() => {
    if (data?.themeColor) {
      const existing = getCookie("themeColor");
      if (existing !== data.themeColor) {
        document.cookie = `themeColor=${data.themeColor}; path=/`;
        // Force refresh so SSR re-renders using the updated cookie
        window.location.reload();
      } else {
        document.documentElement.style.setProperty(
          "--primary",
          data.themeColor
        );
      }
    }
  }, [data]);

  return null;
}

// Helper to read cookie from document.cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] ?? null;
}
