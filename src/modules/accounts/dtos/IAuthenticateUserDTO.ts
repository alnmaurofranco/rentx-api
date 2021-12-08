interface IAuthenticateUserDTO {
  user: {
    id: string;
    name: string;
    email: string;
    driver_license: string;
    isAdmin: boolean;
  };
  token: string;
  refresh_token: string;
}

export { IAuthenticateUserDTO };
