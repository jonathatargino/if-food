// eslint-disable-next-line no-undef
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.{ts,tsx}"],
    moduleNameMapper: {
        "@domain/(.*)": "<rootDir>/src/domain/$1",
        "@if-food-types/(.*)": "<rootDir>/src/types/$1",
        "@controllers/(.*)": "<rootDir>/src/controllers/$1",
        "@services/(.*)": "<rootDir>/src/services/$1",
        "@database/(.*)": "<rootDir>/src/database/$1",
        "@use-cases/(.*)": "<rootDir>/src/useCases/$1",
        "@config/(.*)": "<rootDir>/src/config/$1",
        "@utils/(.*)": "<rootDir>/src/utils/$1",
        "@routes/(.*)": "<rootDir>/src/routes/$1",
    },
};
