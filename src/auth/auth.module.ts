import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports : [
   
    MongooseModule.forFeature([{name : 'User' , schema : UserSchema }]),
    UserModule,
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({secret : 'HELLOSECRETKEYNEST' , signOptions : {expiresIn : '3d'}})
  ] ,
  controllers: [AuthController],
  providers: [AuthService,UserService , JwtStrategy]
})
export class AuthModule {}
