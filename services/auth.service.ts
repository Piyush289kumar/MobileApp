// services/auth.service.ts

import { store } from "@/store";
import { logout as logoutAction } from "@/store/slices/auth.slice";
import { router } from "expo-router";
import { clearToken } from "./storage.service";

export async function logout() {
  await clearToken();
  store.dispatch(logoutAction());
  router.replace("/(auth)/login");
}
