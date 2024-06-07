// Creating a user service
import createService from "./http-service";

export interface User {
  id: number;
  name: string;
}

export default createService('/users');
