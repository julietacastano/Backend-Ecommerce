import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    username:{type: String, require:true},
    email:{type: String, require:true},
    pass:{type: String, require:true},
    edad: {type:Number},
})

export default sessionSchema