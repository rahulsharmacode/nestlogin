import { Controller, Get, HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request,Response } from 'express';
import { AuthGuard , PassportModule } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    @UseGuards(AuthGuard())
    async getController(@Res() res : Response ){
      try{
        let data  = await this.userService.findAll() ;
        res.status(200).json({status:true , message: 'success' , data })
      }
      catch(err){
        throw new HttpException('Somthing went wrong' , HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
}
