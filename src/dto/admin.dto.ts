import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class createAdminDTO {
    @IsString()
    email : string

    @IsString()
    password : string

    @IsBoolean()
    @IsOptional()
    isSuperAdmin : boolean

    @IsBoolean()
    @IsOptional()
    isActive : boolean
}

export class updateAdminDTO {
    @IsString()
    @IsOptional()
    email : string

    @IsString()
    @IsOptional()
    password : string

    @IsBoolean()
    @IsOptional()
    isSuperAdmin : boolean

    @IsBoolean()
    @IsOptional()
    isActive : boolean
}


export class loginAdminDTO {
    @IsNotEmpty()
    @IsString({message: "Email is required"})
    email : string

    @IsNotEmpty()
    @IsString({message: "Password is required"})
    password : string
}