// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',          // Transform TypeScript files with ts-jest
    '^.+\\.(js|mjs)$': 'babel-jest',         // Transform JavaScript and mjs files with babel-jest
  },
  // Do not ignore react-dnd, dnd-core, or react-dnd-html5-backend in transformation
  transformIgnorePatterns: [
    "node_modules/(?!(react-dnd|dnd-core|react-dnd-html5-backend)/)"
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
