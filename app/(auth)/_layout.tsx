// app/(auth)/_layout.tsx
import { getToken } from "@/services/storage.service";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const token = await getToken();
      if (token) {
        router.replace("/(tabs)");
      }
      setLoading(false);
    }
    check();
  }, []);

  if (loading) return null;

  return <Slot />;
}
