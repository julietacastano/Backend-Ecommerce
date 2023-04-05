import bcyrpt from "bcrypt";

function hashpass(pass){
    const salt = bcyrpt.genSalt(10)
    return bcyrpt.hash(pass, salt)
}

function checkpass(pass, passGuardada){
    return bcyrpt.compareSync(pass, passGuardada)
}

export {hashpass, checkpass}