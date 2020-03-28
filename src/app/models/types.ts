export interface Service {
  id: number;
  name: string;
  description: string;
  services: any;
  category: {
    id: number;
    name: string;
  };
}

export interface Handy {
  users: Users;
  categories: Categories;
  services: Services;
  UserServices: any;
  UserProfile: any;
  id: number;
  user_id: number;
  category_id: number;
  professional_summary: string;
  experience: string;
  certificate: string;
  job_location: string;
  job_address: string;
  created_at: string;
  updated_at: string;
  user_services: UserServices;
}

export interface Services {
  id: number;
  name: string;
  description: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export interface Categories {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Users {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: any;
  gender: string;
  phone_number: string;
  location: string;
  address: string;
  image: string;
  mode: string;
  verified: number;
  created_at: string;
  updated_at: string;
  user_services: UserServices[];
}

export interface UserProfile {
  id: number;
  user_id: number;
  category_id: number;
  professional_summary: string;
  experience: string;
  certificate: string;
  job_location: string;
  job_address: string;
  created_at: string;
  updated_at: string;
}

export interface UserServices {
  id: number;
  user_id: number;
  category_id: number;
  service_id: number;
  created_at?: any;
  updated_at?: any;
  categories: Categories;
  services: Services;
}
