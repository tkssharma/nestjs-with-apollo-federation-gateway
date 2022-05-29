module.exports = {
  "setupFiles": [
    "<rootDir>/test/setEnvVars.js"
  ],
  "moduleFileExtensions": [
    "js",
    "ts"
  ],
  "rootDir": ".",
  "testRegex": "[.]spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "coverageDirectory": "./coverage",
  "testEnvironment": "node",
  "roots": [
    "<rootDir>/"
  ],
  moduleNameMapper: {
    "^@app(.*)$": "<rootDir>/src/app/$1",
    "^@auth(.*)$": "<rootDir>/src/app/auth/$1",
    "^@domain(.*)$": "<rootDir>/src/app/domain/$1",
    "^@blob(.*)$": "<rootDir>/src/app/blob/$1",
    "^@db(.*)$": "<rootDir>/src/db/$1",
    "^@config(.*)$": "<rootDir>/src/config/$1",
    "^@core(.*)$": "<rootDir>/src/app/core/$1",
    "^@logger(.*)$": "<rootDir>/src/logger/$1",
    "^@kafka(.*)$": "<rootDir>/src/kafka/$1",
    "^@test(.*)$": "<rootDir>/test/$1",
  },
}