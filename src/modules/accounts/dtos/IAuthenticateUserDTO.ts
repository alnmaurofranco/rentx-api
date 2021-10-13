interface IAuthenticateUserDTO {
  user: {
    id: string;
    name: string;
    email: string;
    driver_license: string;
    isAdmin: boolean;
  };
  token: string;
}

export { IAuthenticateUserDTO };
