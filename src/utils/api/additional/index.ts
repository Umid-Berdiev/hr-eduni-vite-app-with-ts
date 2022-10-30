import { useApi } from "@/composable/useApi";

const api = useApi();

export async function languagesList() {
  try {
    const { data } = await api({
      url: `/api/v1/languages/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function countriesList() {
  try {
    const { data } = await api({
      url: `/api/v1/countries/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function regionsList() {
  try {
    const { data } = await api({
      url: `/api/v1/regions/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function districtsList(id) {
  try {
    const { data } = await api({
      url: `/api/v1/districts/list?region_id=${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function nationsList() {
  try {
    const { data } = await api({
      url: `/api/v1/nations/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function academicDegreesList() {
  try {
    const { data } = await api({
      url: `/api/v1/academic-degrees/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function academicTitlesList() {
  try {
    const { data } = await api({
      url: `/api/v1/academic-titles/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function universitiesList() {
  try {
    const { data } = await api({
      url: `/api/v1/universities/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function citizenshipList() {
  try {
    const { data } = await api({
      url: `/api/v1/citizenships/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
