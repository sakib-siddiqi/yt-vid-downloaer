import axios from "axios";
const DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://yt15.vercel.app/"
    : "http://localhost:3000/";

const apiClient = axios.create({
  baseURL: `${DOMAIN}api`,
});

class APIClass {
  async search(q = "") {
    const { data } = await apiClient.get("/search", {
      params: { yt: (q + "").trim() },
    });
    return data;
  }

  async share(file){
    
  }
}

const API = new APIClass();
export default API;
