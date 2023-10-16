import express from "express";
import { get , merge } from 'lodash';

import { getUserBySessionToken } from "./../db/users";

export const isAuthentificated = async (req : express.Request , res : express.Response , next : express.NextFunction)=> {
    const dataSend : any = {}; 
    try {
        console.log(req.cookies , "Token");
        const sessionToken = req.cookies['RENT-AUTH'];
        
        if(!sessionToken){
            throw new Error("Session required , You must first login !");
        }

        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            throw new Error("Session forbiden ,  You must first login !");
        }
        merge(req , { identity : user });
        next(); 
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
} 

