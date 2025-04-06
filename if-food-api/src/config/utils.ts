export function parseEnviromentVariable<T>(variableName: string, fallbackValue: T) {
    return process.env[variableName] || fallbackValue;
}

export function parseIntegerEnviromentVariable(variableName: string, fallbackValue: number) {
    const enviromentVariable = parseEnviromentVariable(variableName, fallbackValue);

    return Number(enviromentVariable);
}

export function parseStringEnviromentVariable(variableName: string, fallbackValue: string) {
    return parseEnviromentVariable(variableName, fallbackValue);
}
