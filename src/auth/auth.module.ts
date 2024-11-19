import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController, SessionController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schemas/session.schema';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: "XXXX",
      signOptions: {expiresIn: '1h'}
    }),
    MongooseModule.forFeature([{name: Session.name, schema: SessionSchema}])
  ],
  controllers: [
    AuthController,
    SessionController
  ],
  providers: [AuthService]
})
export class AuthModule {}