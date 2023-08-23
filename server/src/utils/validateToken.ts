import jwt from "jsonwebtoken"


function validatedToken (token: any){
    if(!token){
        return false
    }
    const vtoken: any = jwt.verify(token, process.env.CONTRASENASECRETA, {}, (err: any, decoded: {id: string}) => {
        if(err){
            return false
        }
        return decoded
    })
    return vtoken
}


export default validatedToken