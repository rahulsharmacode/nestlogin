import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request , Response } from 'express';
import { createAdminDTO, loginAdminDTO, updateAdminDTO } from 'src/dto/admin.dto';


@Controller('admin')
export class AdminController {

    constructor(private readonly adminService : AdminService){}

    @Get()
   
    async getController( @Res() res : Response ){
        let data = await this.adminService.findAll();
        if(data){
            res.status(200).json({status:true , message : 'success' ,data , total:data.length })
        }
    }


    @Post()
    async postController( @Res() res : Response , @Body( new ValidationPipe()  ) body : createAdminDTO ){
        try{
            let data = await this.adminService.createOne(body);
            res.status(200).json({status:true , message : 'success' ,data})
        }
        catch(err){
            res.status(404).json({status:false , message : 'Error'})
        }
    }


    
    @Put('/:id')
    async putController( @Res() res : Response , @Param('id') param : any , @Body( new ValidationPipe()  ) body : updateAdminDTO ){
        try{
            let data = await this.adminService.updateOne(param , body);
            res.status(200).json({status:true , message : 'success' ,data})
        }
        catch(err){
            res.status(404).json({status:false , message : 'Error'})
        }
    }



    @Delete('/:id')
    async deleteController( @Res() res : Response , @Param('id') param : any ){
        let data = await this.adminService.deleteOne(param);
       
        if(data){
            res.status(200).json({status:true , message : 'success'})
        }
        else{
            res.status(404).json({status:false , message : 'failed, data not found'})
        }
    }


    @Post('/login')
    async loginController( @Res() res : Response  , @Body( new ValidationPipe()  ) body : loginAdminDTO ){
        let token = await this.adminService.login(body);
        if(token){
            res.status(200).json({status:true , message : 'success' , token})
        }
    }


}
