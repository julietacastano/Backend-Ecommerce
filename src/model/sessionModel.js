import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    nombre:{type: String, require:true},
    email:{type: String, require:true},
    contra:{type: String, require:true},
    edad: {type:Number},
})

export default sessionSchema