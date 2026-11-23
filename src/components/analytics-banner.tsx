"use client";

import { IconSunFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "portfolio-greeting-dismissed";

export function AnalyticsBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const acknowledged = localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) setShow(true);
  }, []);

  const handleOk = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <Alert
      className="fixed bottom-10 left-0 right-0 z-50 md:left-1/2 md:max-w-2xl md:-translate-x-1/2 bg-chart-3 items-center [&>svg]:size-6"
      variant="default"
    >
      <IconSunFilled aria-hidden />
      <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <span className="text-muted-foreground text-sm">
          Hey there, thanks for stopping by! Hope you're having a great day.
        </span>
        <Button size="sm" className="shrink-0 font-normal" onClick={handleOk}>
          Thanks!
        </Button>
      </AlertDescription>
    </Alert>
  );
}
