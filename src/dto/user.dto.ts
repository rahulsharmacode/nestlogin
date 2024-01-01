import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class createUserDTO {
    @IsString()
    @IsNotEmpty()
    email : string

    @IsString()
    name : string

    @IsString()
    gender : string
}

export class updateUserDTO {
    @IsString()
    @IsOptional()
    email : string

    @IsString()
    @IsOptional()
    name : string


    @IsString()
    @IsOptional()
    gender : string
}
