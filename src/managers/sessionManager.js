import { sessionDb } from "./mongoManager.js";
import { hashpass, checkpass } from "../helpers/utils.js";
//import jwtGenerator from "../helpers/token.js";

class SessionManager {
    constructor (model){
        this.model = model
    }

    //Crear usuario ------------------------------------------------------
    async addSession({name, email, edad, pass, rol}){
        if(!name){return {error: 'El nombre es obligatorio'}}
        if(!email){return {error: 'El email es obligatorio'}}
        if(!pass){return {error: 'La contraseña es obligatoria'}}

        const findEmail = await this.model.findOne({email})

        if(findEmail){
            return {error:"Email registrado, por favor avanzar a log in"}
        }

        const passHash = await hashpass(pass) 
        console.log(passHash)

        const newSession = await this.model.create({
            name:name,
            email: email,
            edad: edad,
            pass: passHash,
            rol:rol
        })

        return {succes:`Felicitaciones ${newSession.name}, tu cuenta se ha creado correctamente`}
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

        const passHash = hashpass(newpass) 

        await this.model.updateOne({email:email}, {$set:{pass:passHash}})

        return {succes:`password actualizada con exito`}
    }
}

const sessManager = new SessionManager(sessionDb)

export default sessManager
