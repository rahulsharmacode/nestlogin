import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from './schema/admin.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private AdminModel: mongoose.Model<Admin>,
    private jwtService : JwtService
  ) {}

  async findAll() {
    try {
      let res = await this.AdminModel.find().select('-password -__v');
      return res;
    } catch (err) {
      return err;
    }
  }

  async findId(id: number) {
    try {
      let res = await this.AdminModel.findById({ _id: id });
      return res;
    } catch (err) {
      return err;
    }
  }

  async createOne(data: Admin) {
    try {
    
      let findEmail  = await this.AdminModel.findOne({email : data.email});
      if(findEmail){
        throw new HttpException('Email already exist' , HttpStatus.CONFLICT)
      }  
      else{
      let hashPassword = await bcrypt.hash(data.password , 10);
      console.log(hashPassword , 'has')
      let res = new this.AdminModel({
        email : data.email,
        password : hashPassword
      });
      let saveData = await res.save();
      return saveData;
      }
    } catch (err) {
        throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateOne( id:number , data: Admin) {
    try {
      let findData = await this.AdminModel.findById({_id:id});
      if(!findData){
        throw new HttpException('Data not found' , HttpStatus.NOT_FOUND)
      }
        else{
            findData.email = data.email
            findData.password = data.password
            findData.isSuperAdmin = data.isSuperAdmin
            findData.isActive = data.isActive
            let saveData = await findData.save();
            return saveData;
        }
      
    } catch (err) {
        throw new HttpException(err , HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteOne(id: number) {
    try {
      let findData = await this.AdminModel.findByIdAndDelete({ _id: id });
      return findData;
    } catch (err) {
      return err;
    }
  }

  async login(data:any){
    let findEmail  = await this.AdminModel.findOne({email : data.email});
    if(!findEmail){
        throw new HttpException('Email not found' , HttpStatus.NOT_FOUND);
    }  
    
    let hashPassword = await bcrypt.compare(data.password , findEmail.password);
    if(!hashPassword){
      throw new HttpException('Password didnot matched' , HttpStatus.CONFLICT);
    }
    const token = this.jwtService.sign({id : findEmail._id})
    return token
  }

}
