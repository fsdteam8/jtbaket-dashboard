// Types
type UserAddressType = {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: string;
  role: string;
  stripeAccountId: string | null;
  bio: string;
  profileImage: string;
  multiProfileImage: string[];
  pdfFile: string;
  isVerified: boolean;
  status: string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate: string | null;
  blockedUsers: string[];
  language: string;
  address: UserAddressType;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PaginationType = {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type UsersResponseDataType = {
  users: UserType[];
  pagination: PaginationType;
};

export type UsersApiResponseType = {
  status: string;
  message: string;
  data: UsersResponseDataType;
};