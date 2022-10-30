import { useApi } from "@/composable/useApi";

const api = useApi();

export async function fetchHeiInfo() {
  try {
    const { data } = await api({
      url: `/api/v1/about/show`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function editAbout(id, payload) {
  try {
    const { data } = await api({
      url: `/api/v1/about/edit/${id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function universityTypesList() {
  try {
    const { data } = await api({
      url: `/api/v1/university-types/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function universityFormsList() {
  try {
    const { data } = await api({
      url: `/api/v1/university-forms/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
