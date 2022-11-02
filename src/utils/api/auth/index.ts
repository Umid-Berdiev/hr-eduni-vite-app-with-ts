import { useApi } from "@/composable/useApi";

const api = useApi();

export async function login(payload: any) {
  try {
    const { data } = await api({
      url: `${import.meta.env.VITE_API_AUTH_URL}/api/auth/login`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const { data } = await api({
      url: `${import.meta.env.VITE_API_AUTH_URL}/api/auth/logout`,
      method: "POST",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
