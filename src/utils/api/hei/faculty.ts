import { useApi } from "@/composable/useApi";

const api = useApi();

export async function createFaculty(payload: any) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/faculty`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchFacultyById(id: number) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/faculty/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateFacultyById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/faculty/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function facultiesList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/v1/departments/faculties-list`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function facultyTypeList() {
  try {
    const { data } = await api({
      url: `/api/v1/departments/faculty-type-list`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
