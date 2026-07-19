"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1e293b",
          color: "#f8fafc",
          borderRadius: "0.5rem",
          padding: "12px 16px",
          fontSize: "14px",
          border: "1px solid #334155",
        },
        success: {
          iconTheme: {
            primary: "#0f766e",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
