import { Error as err } from "mongoose";

export interface Error extends err {
    statusCode?: number;
}