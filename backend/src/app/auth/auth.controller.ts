import { Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthRequest } from './interfaces/authRequest.interface';
import { IsPublic } from './decorators/isPublic.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login (@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }

    @IsPublic()
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
      // Este método pode estar vazio porque o AuthGuard redireciona automaticamente para o Google
    }
  
    // Handle the Google OAuth2 callback
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
      const user = this.authService.googleLogin(req);
      // Redireciona ou responde conforme a lógica da sua aplicação
      return res.redirect('/some-url'); // Redireciona após login bem-sucedido
    }
}
