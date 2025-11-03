import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} 

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirige automáticamente a Google
  }

@Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req: any, @Res() res: any) {
  const { token } = req.user;

  // Redirigimos al frontend con el token como parámetro
  return res.redirect(`http://localhost:4200/register?token=${token}`);
}
}