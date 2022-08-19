const developmentMode = import.meta.env.MODE === "development";

export const NODE_BACKEND_URL = developmentMode
  ? "http://127.0.0.1:3000/api"
  : "http://54.166.228.14/api";
