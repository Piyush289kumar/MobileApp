// services/storage.service.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) =>
  await AsyncStorage.setItem("token", token);

export const getToken = async () => await AsyncStorage.getItem("token");

export const clearToken = async () => await AsyncStorage.removeItem("token");
