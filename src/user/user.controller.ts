import { Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from 'src/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor( private readonly userService : UserService ){}
    @Get()
    async getController(){
        try{
            let data = await this.userService.findAll();
            return { status : true , message : "success" , data , total : data.length }  
        }
        catch(err){
            throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    
    async postController( @Body() body : createUserDto , @UploadedFile() image : Express.Multer.File ){
        try{
            body.image = '/images/'+image.filename;
            let data = await this.userService.createOne(body);
            return { status : true , message : "success" , data };
        }
        catch(err){
            throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}