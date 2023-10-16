import express from "express";
import { get , merge } from 'lodash';

import { getUserBySessionToken } from "./../db/users";

export const isAuthentificated = async (req : express.Request , res : express.Response , next : express.NextFunction) => {
    const dataSend = {};
    try {
        const sessionToken = req.get('Authorization').split(' ')[1];
        if (!sessionToken) {
            throw new Error("Session required. You must first log in!");
        }
        
        const user = await getUserBySessionToken(sessionToken);
        console.log(sessionToken);
        if (!user) {
            throw new Error("Session forbidden. You must first log in!");
        }

        merge(req, { identity: user });
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}
