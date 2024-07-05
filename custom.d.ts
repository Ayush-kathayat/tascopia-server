// custom.d.ts or any other name you prefer
import IUser from "./src/models/users"; // Adjust the import path to where your User model is located

declare module "express-serve-static-core" {
  interface Request {
    user?: typeof IUser; // Use the User model type here. Adjust if your User model's type is defined differently.
  }
}
