import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports : [

    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/images',
        filename: function (req, file, cb) { cb(null, Date.now()+file.originalname) }
      }),
    }),

    MongooseModule.forFeature([{name : 'User' , schema : UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService]
})
export class UserModule {}
