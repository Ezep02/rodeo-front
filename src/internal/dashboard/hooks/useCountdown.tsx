import { useEffect, useState } from "react";

export function useCountdown(expiry: string | Date) {
  const [timeLeft, setTimeLeft] = useState("");
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!expiry) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expireTime = new Date(expiry).getTime();
      const diff = expireTime - now;

      if (diff <= 0) {
        setTimeLeft("00:00");
        setExpired(true);
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  return { timeLeft, expired };
}
