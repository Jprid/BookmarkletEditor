export type Script = {
  name: string;
  url: string;
  date_added: string;
  date_last_used: string;
  guid: string;
  id: string;
  show_icon: boolean;
  source: string;
  type: string;
};

export type ApiResponse = {
  scripts: Script[] | string[];
  status: number;
};

export async function getAll() {
  let s = new ScriptService();
  return await s.getAll();
}

export class ScriptService {
  base: string = "http://localhost:5000";
  constructor() {}

  headers: Headers = new Headers({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });

  test() {
    return this.get("ig grab");
  }

  get(name: string) {
    let req = new Request(`${this.base}/${new URLSearchParams(name)}`);
    return fetch(req);
  }

  async getAll(): Promise<ApiResponse> {
    try {
      let res = await fetch(
        new Request(`${this.base}/all`, { headers: this.headers })
      );
      let scripts: ApiResponse = await res.json();
      //scripts.scripts = scripts?.scripts?.map(x => JSON.parse(x.replaceAll('\"', '"')));
      return scripts;
    } catch (error) {
      console.error(error.message);
    }
  }

  async createAsync(name: string, docBody: string): Promise<ApiResponse> {
    try {
      let res = await fetch(`${this.base}/create`, {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify({name: name, content: docBody.trimEnd()}),
      })
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async updateAsync(name: string, docBody: string): Promise<ApiResponse> {
    try {
      const req = new Request(`${this.base}/update`, {
        method: "POST",
        body: `{name: ${name}, content: ${docBody}}`,
      });
    } catch (error) {}
  }
}
