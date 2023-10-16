import express from 'express';
import { isAuthentificated } from './../middlewares';
import { createProperties, deleteProperty, getAllProperty, editProperty, getPropertyByID } from './../controllers/property';

export default (router : express.Router) =>{
    router.post('/property/create/:idUser', isAuthentificated , createProperties);
    router.get('/property/:idUser', isAuthentificated , getAllProperty);
    router.get('/property/id/:idProperty', isAuthentificated , getPropertyByID);
    router.put('/property/update/:idProperty', isAuthentificated , editProperty);
    router.post('/property/delete/:idProperty', isAuthentificated , deleteProperty);
}