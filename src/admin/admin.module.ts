import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({

  imports : [ 
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret : 'NESTJSSECRETEKEY',
      signOptions : {expiresIn : '3d'}
    }),
    MongooseModule.forFeature([{name : 'Admin' , schema: AdminSchema}])] ,

  providers: [ AdminService ],
  controllers: [AdminController]
})
export class AdminModule {}
