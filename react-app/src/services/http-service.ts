// Creating a http service

import apiClient from "./api-client";

interface Item {
  id: number;
}

class HttpService {
  // endpont property
  endpoint: string;

  constructor(endpoint: string) {
    // initialize the endpoint property with the endpoint parameter
    this.endpoint = endpoint;
  }
  // fetching data
  getAll<T>() {
    // controller object
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  // delete data
  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  // add data
  add<T>(item: T) {
    return apiClient.post(this.endpoint, item);
  }

  // update data
  update<T extends Item>(item: T) {
    //patch method is used to update properties
    return apiClient.patch(this.endpoint + "/" + item.id, item);
  }
}

// FUNCTION TO CREATE INSTANCE OF THE CLASS
const createService = (endpoint: string) => new HttpService(endpoint);

export default createService;
