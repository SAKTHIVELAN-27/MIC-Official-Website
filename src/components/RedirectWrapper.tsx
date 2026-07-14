"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent || "";
    const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);

    const checkRedirect = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      if ((isMobile || isPortrait) && window.location.pathname !== "/mobile") {
        router.push("/mobile");
      }
    };

    checkRedirect();

    // Watch for orientation changes
    const mq = window.matchMedia("(orientation: portrait)");
    mq.addEventListener("change", checkRedirect);

    return () => {
      mq.removeEventListener("change", checkRedirect);
    };
  }, [router]);

  return <>{children}</>;
}
