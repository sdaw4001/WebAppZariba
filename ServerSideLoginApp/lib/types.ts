export interface IResults {
    success: boolean;
    data?: {};
    error?: ErrorCodes;
}

export class Result implements IResults{
    success: boolean;
    data?: {};
    error?: ErrorCodes;

    constructor(success: boolean, data?: {}, error?: ErrorCodes) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
}

export enum ErrorCodes {
    BadRequest = "400 Bad request" ,  
    NotFound = "404 Not Found", 
    IternalServerError = "500 Internal Server Error"
}