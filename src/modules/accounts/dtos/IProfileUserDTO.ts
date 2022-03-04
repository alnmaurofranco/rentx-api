export type IProfileUserDTO = {
  name: string;
  email: string;
  avatar: string;
  driver_license: string;
  created_at: Date;
  updated_at: Date;
  avatar_url(): string;
};
