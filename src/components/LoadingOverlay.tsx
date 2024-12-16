"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => setLoading(false), 500); // Adjust delay as needed
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner" />
    </div>
  );
}
