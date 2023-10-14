import express from "express";
import authentification from "./authentification";
import property from "./property";
import tenant from "./tenant";

const router = express.Router();

export default () : express.Router =>{
    authentification(router);
    property(router);
    tenant(router);
    return router;
}