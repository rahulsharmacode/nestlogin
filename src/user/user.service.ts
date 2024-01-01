import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private UserModel : mongoose.Model<User>
    ){}

    async findAll(): Promise<User[]>{
        try{
            let findData = await this.UserModel.find();
         
            return findData
        }
        catch(err){
            throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
