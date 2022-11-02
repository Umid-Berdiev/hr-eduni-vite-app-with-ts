import { useApi } from "@/composable/useApi";

const api = useApi();

export async function createFaculty(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/create-faculty`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateFaculty(id, payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/update-faculty/${id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function facultiesList() {
  try {
    const { data } = await api({
      url: `/api/v1/departments/faculties-list`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
