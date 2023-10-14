import express from 'express';
import { isAuthentificated } from './../middlewares';
import { createProperties, deleteProperty, getAllProperty, editProperty } from './../controllers/property';

export default (router : express.Router) =>{
    router.post('/porperty/create/:idUser', isAuthentificated , createProperties);
    router.get('/porperty/:idUser', isAuthentificated , getAllProperty);
    router.put('/porperty/update/:idProperty', isAuthentificated , editProperty);
    router.delete('/porperty/delete/:idProperty', isAuthentificated , deleteProperty);
}