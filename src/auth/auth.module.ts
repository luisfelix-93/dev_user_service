import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: "XXXX",
      signOptions: {expiresIn: '1h'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}