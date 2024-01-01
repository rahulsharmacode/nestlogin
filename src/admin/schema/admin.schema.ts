import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true
})

export class Admin {
    @Prop()
    email : string

    @Prop()
    password : string

    @Prop({default : false})
    isSuperAdmin : boolean

    @Prop({default : true})
    isActive : boolean
}

export const AdminSchema = SchemaFactory.createForClass(Admin);