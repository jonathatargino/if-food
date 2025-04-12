import { parseStringEnviromentVariable } from "./utils";

interface IfFoodApiConfig {
    url: string;
}

export const ifFoodApiConfig: IfFoodApiConfig = {
    url: parseStringEnviromentVariable("VITE_IF_FOOD_API_URL", "http://localhost:3009/api/v1"),
};
