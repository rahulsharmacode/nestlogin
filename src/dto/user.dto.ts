import { IsOptional, IsString } from "class-validator";


export class createUserDto {
    @IsString()
    name : string

    @IsString()
    email : string

    @IsString({message : 'Password is required'})
    password : string

    @IsString()
    @IsOptional()
    image : string

}