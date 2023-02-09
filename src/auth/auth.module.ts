import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EthereumStrategy } from './ethereum.strategy';

@Module({
  imports: [],
  providers: [EthereumStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
