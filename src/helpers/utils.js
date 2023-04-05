import bcyrpt from "bcrypt";

function hashpass(pass){
    return bcyrpt.hash(pass, 10)
}

function checkpass(pass, passGuardada){
    return bcyrpt.compareSync(pass, passGuardada)
}

export {hashpass, checkpass}