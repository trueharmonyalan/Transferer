/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@db/(.*)$': '<rootDir>/packages/db/$1',
    '^@websocket/(.*)$': '<rootDir>/signalingServer/src/websockets/$1',
    '^signalingServer/(.*)$': '<rootDir>/signalingServer/$1',
    '^@handlerInterfaces/(.*)$': '<rootDir>/signalingServer/src/websockets/src/handlerInterfaces/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'signalingServer/tsconfig.json',
      },
    ],
  },
};
