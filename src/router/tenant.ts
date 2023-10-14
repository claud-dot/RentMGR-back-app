import express from 'express';
import { isAuthentificated } from './../middlewares';
import { addTenant, deleteTenant, editTenant, getTenant } from './../controllers/tenant';

export default (router : express.Router) =>{
    router.post('/tenant/create/:idProperty', isAuthentificated , addTenant);
    router.get('/tenant/:idProperty', isAuthentificated , getTenant);
    router.put('/tenant/update/:idTenant', isAuthentificated , editTenant);
    router.delete('/tenant/delete/:idTenant', isAuthentificated , deleteTenant);
}