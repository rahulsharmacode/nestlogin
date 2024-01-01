import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps : true
})

export class User {
    @Prop()
    name : string

    @Prop()
    email : string

    @Prop({default : 'male'})
    gender : string
}

export const UserSchema = SchemaFactory.createForClass(User);
