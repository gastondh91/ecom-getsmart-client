const developmentMode = import.meta.env.MODE === "development";

const LOCAL_NODE_BACKEND_URL = "http://127.0.0.1:3000/api";
const PROD_NODE_BACKEND_URL = "http://54.166.228.14/api";

export const NODE_BACKEND_URL = developmentMode
  ? LOCAL_NODE_BACKEND_URL
  : PROD_NODE_BACKEND_URL;
