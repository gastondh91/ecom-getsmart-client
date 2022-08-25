const { VITE_MODE, VITE_LOCAL_NODE_BACKEND_URL, VITE_PROD_NODE_BACKEND_URL } =
  import.meta.env

const developmentMode = VITE_MODE === 'development'

const backendNodeUrls = {
  DEVELOPMENT: VITE_LOCAL_NODE_BACKEND_URL,
  PRODUCTION: VITE_PROD_NODE_BACKEND_URL
}

export const NODE_BACKEND_URL = developmentMode
  ? backendNodeUrls.DEVELOPMENT
  : backendNodeUrls.PRODUCTION
