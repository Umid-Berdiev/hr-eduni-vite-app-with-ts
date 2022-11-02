import { useApi } from "@/composable/useApi";

const api = useApi();

export async function fetchList(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/employees/all-employees-list`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function listEmployees(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/employees/list-employees`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEmployeeByID(id) {
  try {
    const { data } = await api({
      url: `/api/v1/employees/show-employee/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id) {
  try {
    const { data } = await api({
      url: `/api/v1/work-contracts/change-status/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createEmployee(payload) {
  try {
    const { data } = await api({
      url: `/api/v1/employees/create-employee`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployee(id, payload) {
  try {
    const { data } = await api({
      url: `/api/v1/employees/update/${id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
