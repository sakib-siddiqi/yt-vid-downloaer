const DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://yt15.vercel.app/"
    : "http://localhost:3000/";

class APIClass {
  root = `${DOMAIN}api`;
  async search(q) {
    return await (await fetch(this.root + "/search?yt=" + q)).json();
  }
}

const API = new APIClass();
export default API;
