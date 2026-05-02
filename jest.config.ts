// site/jest.config.ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^gsap$": "<rootDir>/__mocks__/gsap.ts",
    "^gsap/(.*)$": "<rootDir>/__mocks__/gsap.ts",
    "^swiper$": "<rootDir>/__mocks__/swiper.ts",
    "^swiper/(.*)$": "<rootDir>/__mocks__/swiper.ts",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
};

export default config;
