// app/(tabs)/_layout.tsx
import { getToken } from "@/services/storage.service";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";

// UI (optional loading screen)
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";

export default function TabsProtectedLayout() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      const token = await getToken();

      if (!token) {
        router.replace("/(auth)/login");
        return;
      }
      setChecking(false);
    }

    verifyAuth();
  }, []);

  if (checking) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  return <Slot />;
}
