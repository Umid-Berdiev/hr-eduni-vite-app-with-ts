import { useApi } from "@/composable/useApi";

const api = useApi();

export async function departmentsList() {
  try {
    const { data } = await api({
      url: `/api/v1/departments/departments-list`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createDepartment(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/create-department`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDepartment(id, payload) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/update-department/${id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDepartment(id) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/update-department/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDepartment(id) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/delete-department/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/change-status/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
