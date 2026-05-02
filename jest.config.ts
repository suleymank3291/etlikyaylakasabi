// site/jest.config.ts
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^gsap$": "<rootDir>/__mocks__/gsap.ts",
    "^gsap/(.*)$": "<rootDir>/__mocks__/gsap.ts",
    "^swiper$": "<rootDir>/__mocks__/swiper.ts",
    "^swiper/(.*)$": "<rootDir>/__mocks__/swiper.ts",
  },
};

export default createJestConfig(config);
