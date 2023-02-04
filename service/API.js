class APIClass {
  root = "http://localhost:3000/api";
  async search(q) {
    return await (await fetch(this.root + "/search?yt="+q)).json();
  }
}

const API = new APIClass();
export default API;