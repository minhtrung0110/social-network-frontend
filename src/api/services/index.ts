import { Params } from "express-serve-static-core";

class ServiceAPI {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  // Hàm xử lý response
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    return response.json();
  }

  // GET all
  async getAll<T>(path: string, params?: Params): Promise<T> {
    try {
      const urlPath = new URL(`${this.url}${path}`);
      if (params) {
        Object.keys(params).forEach((key) => urlPath.searchParams.append(key, params[key]));
      }

      const res = await fetch(urlPath.toString(), {
        method: 'GET',
        credentials: 'include', // optional, if you need to include cookies
      });

      return this.handleResponse<T>(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // GET one
  async getOne<T>(path: string, id?: string | number): Promise<T> {
    try {
      const urlPath = id ? `${this.url}${path}/${id}` : `${this.url}${path}`;
      const res = await fetch(urlPath, {
        method: 'GET',
        credentials: 'include',
      });

      return this.handleResponse<T>(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // POST (add)
  async add<T>(path: string, data: Omit<T, 'id'>): Promise<T> {
    try {
      const urlPath = `${this.url}${path}`;
      const res = await fetch(urlPath, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // PUT (update)
  async put<T>(path: string, data: Partial<T>): Promise<T> {
    try {
      const urlPath = `${this.url}${path}`;
      const res = await fetch(urlPath, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // DELETE
  async delete(path: string, id: string | number) {
    try {
      const urlPath = `${this.url}${path}/${id}`;
      const res = await fetch(urlPath, {
        method: 'DELETE',
        credentials: 'include',
      });

      return this.handleResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ServiceAPI;
