import express from "express";
import { sendQuittance } from "./../controllers/mail-sender";
import { isAuthentificated } from "./../middlewares";

export default (router : express.Router) =>{
    router.post('/quittance/:idUser', isAuthentificated, sendQuittance)
}