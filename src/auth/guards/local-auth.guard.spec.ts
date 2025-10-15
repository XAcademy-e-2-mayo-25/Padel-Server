// src/auth/guards/local-auth/local-auth.guard.spec.ts
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('LocalAuthGuard', () => {
  let guard: LocalAuthGuard;

  beforeEach(() => {
    guard = new LocalAuthGuard();
  });

  it('debería estar definido', () => {
    expect(guard).toBeDefined();
  });

  it('debería ser una instancia de AuthGuard("local")', () => {
    expect(guard).toBeInstanceOf(AuthGuard('local').constructor);
  });

  it('debería llamar canActivate del AuthGuard base', async () => {
    const context = {} as ExecutionContext;

    const canActivateSpy = jest
      .spyOn(AuthGuard('local').prototype, 'canActivate')
      .mockReturnValue(true);

    const result = await guard.canActivate(context);

    expect(canActivateSpy).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
