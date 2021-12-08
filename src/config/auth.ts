interface IAuthJWT {
  secret_token: string;
  secret_refresh_token: string;
  expires_in_token: string;
  expires_in_refresh_token: string;
  expires_refresh_token_days: number;
}

const configAuth: IAuthJWT = {
  secret_token: '331bc862-25d2-11ec-9254-ff007eb08874',
  secret_refresh_token: '6160ef98-2c6e-4274-8c6f-85614cf3049b',
  expires_in_token: '15m',
  expires_in_refresh_token: '30d',
  expires_refresh_token_days: 30,
};

export { configAuth };
