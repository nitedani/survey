export { basePath }
const basePath = import.meta.env.SSR ? process.env.INTERNAL_API_URL! : '/api'
