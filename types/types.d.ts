// types.d.ts or any other .d.ts file in your project
import IUser from "../src/interfaces/user.interface";


import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  user?: IUser // or any other type
}

