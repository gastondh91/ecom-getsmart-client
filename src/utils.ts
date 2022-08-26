const {
  VITE_MODE,
  VITE_DEVELOPMENT_NODE_BACKEND_URL,
  VITE_PRODUCTION_NODE_BACKEND_URL
} = import.meta.env

const developmentMode = VITE_MODE === 'development'

const backendNodeUrls = {
  DEVELOPMENT: VITE_DEVELOPMENT_NODE_BACKEND_URL,
  PRODUCTION: VITE_PRODUCTION_NODE_BACKEND_URL
}

export const NODE_BACKEND_URL = developmentMode
  ? backendNodeUrls.DEVELOPMENT
  : backendNodeUrls.PRODUCTION
