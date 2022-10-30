import { useApi } from "@/composable/useApi";

const api = useApi();

export async function rolesList() {
  try {
    const { data } = await api({
      url: `/api/v1/users/roles-list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const { data } = await api({
      url: `/api/v1/users/get-profile`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function editProfile(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/users/profile-edit`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
