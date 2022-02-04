import { SignupMiddleware } from './signup.middleware';

describe('SignupMiddleware', () => {
  it('should be defined', () => {
    expect(new SignupMiddleware()).toBeDefined();
  });
});
