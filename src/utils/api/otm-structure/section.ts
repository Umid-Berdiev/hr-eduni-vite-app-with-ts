import { useApi } from "@/composable/useApi";

const api = useApi();

export async function departmentTypeList() {
  try {
    const { data } = await api({
      url: `/api/v1/departments/section-type-list`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sectionsList(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/sections-list`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createSection(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/create-section`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateSection(id, payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/update-section/${id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
