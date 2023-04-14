import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    name:{type: String, require:true},
    email:{type: String, require:true},
    pass:{type: String, require:true},
    edad: {type:Number},
    rol:{type:String}
})

export default sessionSchema