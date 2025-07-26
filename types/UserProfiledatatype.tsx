export interface UserAddress {
  country: string;
  cityState: string;
  roadArea?: string;
  postalCode: string;
  taxId: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: "male" | "female" | "other" | null;
  role: "USER" | "ADMIN" | string;
  stripeAccountId: string | null;
  bio: string;
  profileImage: string;
  multiProfileImage: string[];
  pdfFile: string;
  otp: string | null;
  otpExpires: string | null;
  isVerified: boolean;
  refreshToken: string;
  status: "approved" | "pending" | "rejected" | string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate: string | null;
  blockedUsers: string[];
  language: string;
  address: UserAddress;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: UserData;
}
