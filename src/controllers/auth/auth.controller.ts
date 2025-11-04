import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/services/auth/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth') //Agrupa estos endpoints en Swagger bajo el tag "Auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} 

  @Get('verify')
@UseGuards(JwtAuthGuard)
verifyToken(@Req() req) {
  return { valid: true, user: req.user };
}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirige al usuario a Google para autenticación' })
  @ApiResponse({
    status: 302,
    description: 'Redirección a Google OAuth2 para autenticar al usuario',
  })
  async googleAuth() {
    // Redirige automáticamente a Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback de Google. Devuelve los datos del usuario y el token' })
  @ApiResponse({
    status: 200,
    description: 'Autenticación exitosa. Devuelve la información del usuario y token',
  })
  @ApiResponse({
    status: 401,
    description: 'Autenticación fallida o token inválido',
  })
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
  const { token } = req.user;

  // Redirigimos al frontend con el token como parámetro
  return res.redirect(`http://localhost:4200/register?token=${token}`);
}
}

