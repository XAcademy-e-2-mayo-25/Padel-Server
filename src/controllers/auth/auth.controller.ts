import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth') //Agrupa estos endpoints en Swagger bajo el tag "Auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async googleAuthRedirect(@Req() req: any) {
    // La respuesta ya incluye usuario y token
    return req.user;
  }
}

