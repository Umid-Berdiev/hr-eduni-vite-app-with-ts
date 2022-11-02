export interface EmployeeInterface {
  id: string | number;
  citizenship_id: string;
  contract_date: string;
  passport_date: string;
  pinfl: string;
  passport_number: string;
  surname: string;
  name: string;
  patronymic: string;
  image: string;
  birthdate: string;
  gender: string;
  address_home: string;
  speciality: string;
  email: string;
  phone: string;
  work_count: string;
  status: string;
  country_id: string;
  region_id: string;
  district_id: string;
  nation_id: string;
  academic_degree_id: string;
  academic_title_id: string;
  recruitment_date: string;
  role: string;
  created_at: string;
  updated_at: string;
  language: string;
}

export interface EmployeeRoleInterface {
  id: string | number;
  name: string;
  code: string;
}

export interface HeiInterface {
  id: string | number;
  code: string | number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  akk: string;
  phone: string;
  title: string;
  region: string;
  city: string;
  stir: string;
  contact: string;
  rector: string;
  email: string;
  bank: string;
  district: string;
  university_type: string;
  university_form: string;
  bank_information: string;
  accriditaion: string;
}
