import { authentification, random } from './../helpers';
import { createUser, getUserByEmail } from './../db/users';
import express, { response } from 'express'

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
      await createUser({
        nom,
        prenom,
        email,
        authentification: {
          salt,
          password: authentification(salt, password),
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

export const login = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const { email , password } = req.body;
        const user = await getUserByEmail(email).select('+authentification.salt +authentification.password');

        if(!user){
            throw new Error("Email utilisateur inexistant !");
        }
        const passwordHashed = authentification(user.authentification.salt, password); 
        if (user.authentification.password !== passwordHashed) {
            throw new Error("Mot de passe incorrect !");
        }

        const salt = random();
        
        user.authentification.sessionToken = authentification(salt , user.id.toString());
        await user.save();
        
        res.cookie('RENT-AUTH',user.authentification.sessionToken , {
          sameSite: "none", // Utilisation de "None" pour les cookies entre sites
          secure: true, // Envoyer les cookies uniquement sur HTTPS
          httpOnly: true}
        );
        dataSend.status = 200;
        dataSend.data = user;
    } catch (error) {
        console.error("Erreur :", error);
        dataSend.status = 400;
        dataSend.message = error.message; 
      }
      res.send(dataSend); 
}