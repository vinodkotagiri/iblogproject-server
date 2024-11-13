import {ErrorCodes} from '../constants/errorCodes';

export class CustomError extends Error {
    public code:ErrorCodes;
    constructor(code:ErrorCodes, message:string){
        super(message)
        this.code=code
    }
}