import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EthereumStrategy } from './ethereum.strategy';

@Controller('auth')
export class AuthController {
  constructor(private ethereumStrategy: EthereumStrategy) {}

  @Post('login')
  @UseGuards(AuthGuard('ethereum'))
  login(@Req() req) {
    return req.user;
  }

  @Post('challenge')
  challenge(@Req() req: Request) {
    return this.ethereumStrategy.challenge(req);
  }
}
