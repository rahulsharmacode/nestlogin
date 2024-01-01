import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name:"User" , schema : UserSchema}
    ]),
    AdminModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
