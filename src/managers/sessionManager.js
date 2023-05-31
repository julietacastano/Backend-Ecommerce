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

    //Cambiar password ------------------------------------------------------
    async updatepass({email, password}){
        const usuario = await this.model.findOne({email})

        if(!usuario){return {error:"El email no corresponde con un usuario registrado"}}

        usuario.password = password

        await usuario.save()

        return {succes:`password actualizada con exito`}
    }
}

const sessManager = new SessionManager(sessionDb)

export default sessManager
