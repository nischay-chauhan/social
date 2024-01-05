import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        min : 2,
        max : 50,
    },
    lastName : {
        type : String,
        required : true,
        min : 2,
        max : 50,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        min : 5,
    },
    picture : {
        type : Array,
        default : []
    },
    location : String,
    occupation : String,
    viewProfile : String,
    impression : Number,
},
    {timestamps : true}
);

const User = mongoose.model("User" , UserSchema);
export default User