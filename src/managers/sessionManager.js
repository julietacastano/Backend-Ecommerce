import { nanoid } from "nanoid";
import { sessionDb } from "./mongoManager.js";

class SessionManager {
    constructor (model){
        this.model = model
    }

    //Crear usuario ------------------------------------------------------
    async addSession({name, email, edad, password, rol}){
        const usuario = await this.model.findOne({email:email})

        if(usuario){
            return {error:"Email registrado, por favor avanzar a log in"}
        }

        const newSession = await this.model.create({
            name:name,
            email: email,
            edad: edad,
            password,
            rol:rol
        })

        return {succes:`Felicitaciones ${newSession.name}, tu cuenta se ha creado correctamente`}
    }

    //Generar token para cambiar password -----------------------------------------------
    async getToken({email}){
        const usuario = await this.model.findOne({email})
        if(!usuario){return {error:"El email no corresponde con un usuario registrado"}}

        const token = nanoid()
        
        usuario.token = token
        usuario.expira = Date.now() + 3600000

        await usuario.save()

        return usuario

    }
    async validateToken(token){
        const usuario = await this.model.findOne({
            token:token,
            expira:{$gt:Date.now()}
        })

        if(!usuario){
            return {error: 'El formulario expiro, por favor vuelve a intentar'}
        }

        return{succes: 'Token valido'}

    }

    //Cambiar password ------------------------------------------------------
    async updatepass(password, token){
        const usuario = await this.model.findOne({
            token:token,
            expira:{$gt:Date.now()}
        })
        if(!usuario){return {error: 'Error al reestablecer contraseña, por favor vuelve a intentar'}}

        usuario.password = password
        usuario.token = undefined
        usuario.expira = undefined

        await usuario.save()

        return {succes:'Contraseña actualizada con exito'}
    }

}

const sessManager = new SessionManager(sessionDb)

export default sessManager
