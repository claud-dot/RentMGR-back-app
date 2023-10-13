import { authentication, random } from 'helpers';
import { createUser, getUserByEmail } from './../db/users';
import express from 'express'

export const register = async (req: express.Request, res: express.Response) => {
    const dataSend : any = {};
    try {
      const { nom , prenom , email, password } = req.body;
  
      if (!email || !password || !nom || !prenom) {
        throw new Error("Input required !");
      }
  
      const existingUser = await getUserByEmail(email);
    
      if (existingUser) {
        throw new Error("Email already esist !");
      }
  
      const salt = random();
      const user = await createUser({
        nom,
        prenom,
        email,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
      });
  
      dataSend.status=200;
      dataSend.message = "User created successfully !";
    } catch (error) {
      console.log(error);
      dataSend.status=400;
      dataSend.message = error.message;
    }
    res.send(dataSend);
}