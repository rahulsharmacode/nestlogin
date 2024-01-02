import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    async loginController(@Body() body : any){
        let data = await this.authService.loginValid(body);
        return{status:true , message : 'success' , token:data}
        
    }

    @Get('')
    @UseGuards(AuthGuard())
    async getController(){

        return 'ok access'
        
    }
}
