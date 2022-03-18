interface IAuthJWT {
  secret_token: string;
  secret_refresh_token: string;
  expires_in_token: string;
  expires_in_refresh_token: string;
  expires_refresh_token_days: number;
}

const configAuth: IAuthJWT = {
  secret_token: process.env.SECRET_TOKEN,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_in_token: process.env.EXPIRES_IN_TOKEN,
  expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN,
  expires_refresh_token_days: 30,
};

export { configAuth };
