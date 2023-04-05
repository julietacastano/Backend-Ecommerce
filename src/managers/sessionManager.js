import { sessionDb } from "./mongoManager.js";
import { hashpass, checkpass } from "../helpers/utils.js";

class SessionManager {
    constructor (model){
        this.model = model
    }

    //Crear usuario ------------------------------------------------------
    async addSession({username, email, edad, pass}){
        const findEmail = await this.model.findOne({email})

        if(findEmail){
            return {error:"Email registrado, por favor avanzar a log in"}
        }

        const passHash = hashpass(pass) 

        const newSession = await this.model.create({
            username:username,
            email: email,
            edad: edad,
            pass: passHash,
        })

        return {succes:`Felicitaciones ${newSession.username}, tu cuenta se ha creado correctamente`}
    }

    //Login ------------------------------------------------------------------
    async logIn({email, pass}){
        const findUser = await this.model.findOne({email})

        if(!findUser){
            return {error:'Error de autenticacion'}
        }

        const passCheck = checkpass(pass, findUser.pass)
        if(!passCheck){
            return {error:'Error de autenticacion'}
        }

        return {succes:'Usuario verificado'}
    }

    //Cambiar password ------------------------------------------------------
    async updatepass({email, newpass}){
        const findUser = await this.model.findOne({email})
        if(!findUser){return {error:"Error de autenticacion"}}

        const passHash = hashpass(pass) 

        await this.model.updateOne({email:email}, {$set:{pass:passHash}})

        return {succes:`password actualizada con exito`}
    }
}

const sessManager = new SessionManager(sessionDb)

export default sessManager
