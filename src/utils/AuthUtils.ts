import * as bcrypt from "bcryptjs";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface JWTDecoded extends JwtPayload {
  userId: string;
}
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function validatePassword(password:string,hashPassword:string):boolean{
    return bcrypt.compareSync(password,hashPassword)
}

export function generateToken(payload:string,SECRET_KEY:string,expiresIn:string|null){
    const options=expiresIn?{expiresIn}:{}
    const token=jwt.sign({data:payload},SECRET_KEY,options)
    return token
}

export function validateToken(token:string,SECRET_KEY:string):JWTDecoded{
    return jwt.verify(token,SECRET_KEY) as JWTDecoded
}