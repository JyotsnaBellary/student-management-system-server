import { Request as req} from "express";
import { Error as err } from "mongoose";

export interface Error extends err {
    statusCode?: number;
}

export interface Request extends req {
    userId:string;
}
