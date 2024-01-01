import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import mongoose from "mongoose";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Admin } from "../schema/admin.schema";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy){
 
    constructor(
        @InjectModel('Admin')
        private AdminModel : mongoose.Model<Admin>,
        private readonly config: ConfigService,

    ){ 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get<string>('SECRET_KEY')
        })
    }

    async validate(payload:any){
        console.log(payload , 'payload')
        const admin = await this.AdminModel.findById({_id : payload.id });
        console.log(admin , 'admin')
        if(!admin){
            throw new UnauthorizedException('Admin token invalid')
        }
        return admin
    }
}