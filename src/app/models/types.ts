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

export interface Bookings {
  id: number;
  user_id: number;
  provider_id: number;
  category: string;
  service: string;
  book_date: string;
  time: string;
  location: string;
  address: string;
  additional_info: string;
  status: string;
  created_at: string;
  updated_at: string;
}


export interface Handy {
  users: Users;
  providers: Providers;
  categories: Categories;
  services: Services;
  bookings: Bookings;
  ProviderServices: any;
  ProviderProfile: any;
  ProviderBookings: any;
  UpcomingJobs: any;
  PastJobs: any;
  PendingJobs: any;
  AcceptedJobs: any;
  StartedJobs: any;
  Jobs: any;
  id: number;
  user_id: number;
  accepted_at: string;
  started_at: string;
  completed_at: string;
  provider_id: number;
  professional_summary: string;
  experience: string;
  certificate: string;
  job_location: string;
  job_address: string;
  created_at: string;
  updated_at: string;
  provider_services: ProviderServices;
  category: string;
  service: string;
  book_date: string;
  time: string;
  location: string;
  address: string;
  additional_info: string;
  status: string;
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
}

export interface Providers {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: any;
  password: string;
  gender: string;
  phone_number: string;
  location: string;
  address: string;
  image: string;
  verified: number;
  remember_token?: any;
  created_at: string;
  updated_at: string;
  provider_services: ProviderServices[];
}

export interface ProviderProfile {
  id: number;
  user_id: number;
  provider_id: number;
  professional_summary: string;
  experience: string;
  certificate: string;
  job_location: string;
  job_address: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderServices {
  id: number;
  user_id: number;
  category_id: number;
  service_id: number;
  created_at?: any;
  updated_at?: any;
  categories: Categories;
  services: Services;
}

export interface ProviderBookings {
  id: number;
  user_id: number;
  provider_id: number;
  category: string;
  service: string;
  book_date: string;
  time: string;
  location: string;
  address: string;
  additional_info: string;
  status: string;
  created_at: string;
  updated_at: string;
  users: Users;
}