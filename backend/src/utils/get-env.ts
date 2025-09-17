export const getEnv = (key: string, defaultValue: string = ""): string => {
    const value = process.env[key]
    if (value === undefined) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`environment variable ${key} is not set`)

    }
    return value
}