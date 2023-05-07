import dotenv from "dotenv";

dotenv.config();

export const DOMAIN_AUTH0 = process.env.REACT_APP_AUTH0_DOMAIN;
export const CLIENT_ID_AUTH0 = process.env.REACT_APP_AUTH0_CLIENT_ID;
