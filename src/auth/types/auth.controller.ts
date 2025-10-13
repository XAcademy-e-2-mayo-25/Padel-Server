import { Controller, UseGuards, Get } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google-auth/google-auth.guard';
import {Public} from '../decorators/public.decorator'

@Controller('auth')
export class AuthController {
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback() {}
}