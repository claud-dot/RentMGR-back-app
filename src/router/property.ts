import express from 'express';
import { isAuthentificated } from './../middlewares';
import { createProperties, deleteProperty, getAllProperty, editProperty } from './../controllers/property';

export default (router : express.Router) =>{
    router.post('/property/create/:idUser', isAuthentificated , createProperties);
    router.get('/property/:idUser', isAuthentificated , getAllProperty);
    router.put('/property/update/:idProperty', isAuthentificated , editProperty);
    router.delete('/property/delete/:idProperty', isAuthentificated , deleteProperty);
}