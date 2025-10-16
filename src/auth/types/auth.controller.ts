import { Controller, UseGuards, Get, HttpCode, HttpStatus, Post, Request, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';  // ← Importa directamente
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = this.authService.login(req.usr.id);
    return { id: req.usr.id, token };
  }

  @Public()
  @Get('google/login')
  @UseGuards(AuthGuard('google'))  
  googleLogin() {
   
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))  
  async googleCallback(@Req() req) {
    const token = await this.authService.login(req.user.id);
    return { 
      message: 'Google authentication successful',
      user: req.user,
      token: token 
    };
  }
}