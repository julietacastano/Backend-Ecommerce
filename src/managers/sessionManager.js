import { sessionDb } from "./mongoManager.js";

class SessionManager {
    constructor (model){
        this.model = model
    }

    async addSession({nombre, email, edad, contra}){
        const findEmail = await this.model.findOne({email})

        if(findEmail){
            return {error:"Email registrado, por favor avanzar a log in"}
        }

        const newSession = await this.model.create({
            nombre:nombre,
            email: email,
            edad: edad,
            contra: contra,
        })

        return {succes:`Felicitaciones ${newSession.nombre}, tu cuenta se ha creado correctamente`}
    }

    async logIn({email, contra}){
        const findUser = await this.model.findOne({email})

        if(!findUser){
            return {error:'Error de autenticacion'}
        }
        if(contra !== findUser.contra){
            return {error:'Error de autenticacion'}
        }

        return {succes:'Usuario verificado'}
    }
}

const sessManager = new SessionManager(sessionDb)

export default sessManager
