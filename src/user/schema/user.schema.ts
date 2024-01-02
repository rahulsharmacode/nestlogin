import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true
})

export class User {
    @Prop()
    email : string

    @Prop()
    password : string

    @Prop()
    name : string

    @Prop()
    image : string
}

export const UserSchema = SchemaFactory.createForClass(User);