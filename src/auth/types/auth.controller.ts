import { Controller, UseGuards, Get, HttpCode, HttpStatus, Post,Request } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google-auth/google-auth.guard';
import {Public} from '../decorators/public.decorator'
import {AuthGuard} from '@nestjs/passport'   
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){
    const token = this.authService.login(req.usr.id)
    return{id:req.usr.id,token}
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback() {}
}