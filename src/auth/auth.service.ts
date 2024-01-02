import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService 
        
        , private jwtService : JwtService ){}

    async loginValid(data:any){

        const user = await this.userService.findEmail(data.email);
        if(user && await bcrypt.compare(data.password , user.password)){
            const token = this.jwtService.sign({id: user._id})
            return token
        }
        throw new UnauthorizedException();
        
    }


    async tokenValid(data:any){
    
        const user = await this.userService.findId(data);
        console.log(user , 'user')
        if(!user){
            throw new UnauthorizedException();
        }
        return user
    }

}
