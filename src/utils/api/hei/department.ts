import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getDepartment(id: number) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDepartment(id: number) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/${id}/status`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
