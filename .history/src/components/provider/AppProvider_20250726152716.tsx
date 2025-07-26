"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorFetcher } from "@/lib/color-fetcher";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>       <ColorFetcher/>{children}</QueryClientProvider>
    </div>
  );
};

export default AppProvider;
