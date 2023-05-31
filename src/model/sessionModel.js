import mongoose from "mongoose"
import bcrypt from "bcrypt"

const sessionSchema = new mongoose.Schema({
    name:{type: String, require:true},
    email:{type: String, require:true},
    password:{type: String, require:true},
    edad: {type:Number},
    rol:{type:String, lowercase:true,}
})

sessionSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

sessionSchema.methods = {
    comparePassword: function(password){
        return bcrypt.compareSync(password, this.password)
    }
}


export default sessionSchema