import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')
        private userModel : mongoose.Model<User>
    ){}

    async findAll() : Promise<User[]> {
        try{
            let findData = await this.userModel.find();
            return findData
        }
        catch(err){
            throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findEmail(data:string) {
        try{
            let findData = await this.userModel.findOne({email:data});
            return findData
        }
        catch(err){
            throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async createOne(data: User)  {
        try{
            let findData = await this.userModel.findOne({email : data.email});
            if(findData){
            throw new HttpException('Email already registred' , HttpStatus.CONFLICT)
            }
            console.log(data.password , 'data')
            let hashPassword = await bcrypt.hash(data.password , 10);
            data.password = hashPassword;
            
            let newData = new this.userModel(data);
            let saveData = await newData.save();
            return saveData
        }
        catch(err){
            throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
