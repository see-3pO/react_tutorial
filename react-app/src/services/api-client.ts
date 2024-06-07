/*
This file contains code to create a new access client(connects to and communicates with backend server) with custom configuration
*/
import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
