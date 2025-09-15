// export interface ApiClient {
//   post<T>(url: string, body?: unknown): Promise<T>
//   get<T>(url: string, params?: Record<string,string>): Promise<T>
// }

// export class FetchClient implements ApiClient {
//   constructor(private baseUrl: string, private getToken: () => string | null) {}
//   async post<T>(url: string, body?: unknown): Promise<T> {
//     const res = await fetch(this.baseUrl + url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(this.getToken() ? { Authorization: `Bearer ${this.getToken()}` } : {})
//       },
//       body: body ? JSON.stringify(body) : undefined,
//     })
//     if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
//     return res.json() as Promise<T>
//   }
//   async get<T>(url: string, params?: Record<string,string>): Promise<T> {
//     const q = params ? '?' + new URLSearchParams(params).toString() : ''
//     const res = await fetch(this.baseUrl + url + q, {
//       headers: {
//         ...(this.getToken() ? { Authorization: `Bearer ${this.getToken()}` } : {})
//       }
//     })
//     if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
//     return res.json() as Promise<T>
//   }
// }
