import { getEnv } from "../utils/get-env"

const appConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "5000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", ""),

    SESSION_SECRET: getEnv("SESSION_SECRET"),
    SESSION_EXPIRES_IN : getEnv("SESSION_EXPIRES_IN"),

    GOGGLE_CLIENT_ID : getEnv("GOGGLE_CLIENT_ID"),
    GOGGLE_CLIENT_SECRET : getEnv("GOGGLE_CLIENT_SECRET"),
    GOGGLE_CALLBACK_URL : getEnv("GOGGLE_CALLBACK_URL"),

    FRONTEND_ORIGIN : getEnv("FRONTEND_ORIGIN", "localhost"),
    FRONTEND_GOOGLE_CALLBACK_URL : getEnv("FRONTEND_GOOGLE_CALLBACK_URL"),
})

export const config = appConfig() 