// site/__mocks__/gsap.ts
const timeline = jest.fn(() => ({
  to: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  fromTo: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  add: jest.fn().mockReturnThis(),
  kill: jest.fn().mockReturnThis(),
}));

const gsap = {
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  set: jest.fn(),
  timeline,
  registerPlugin: jest.fn(),
  context: jest.fn(() => ({ revert: jest.fn() })),
};

export default gsap;
export const ScrollTrigger = {
  create: jest.fn(),
  refresh: jest.fn(),
  getAll: jest.fn(() => []),
  kill: jest.fn(),
};
