import { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        preset: 'ts-jest/presets/default-esm',
        testEnvironment: 'node',
        testRegex: '(/test/.*\\.spec\\.ts)$',
        coverageProvider: 'v8',

        transform: {
            '^.+\\.(ts|tsx)?$': ["ts-jest", { tsconfig: "./test/tsconfig.json" }],
            "^.+\\.(js|jsx)$": "babel-jest",
        },

        transformIgnorePatterns: [
            "node_modules/(?!@zenflux/core)"
        ],

        setupFilesAfterEnv: [ "<rootDir>/test/__setup__.ts" ],

        moduleNameMapper: {
            "^@zenflux/core$": "<rootDir>/node_modules/@zenflux/core/src/index.ts",
        }
    }
}

