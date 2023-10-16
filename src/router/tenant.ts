import express from 'express';
import { isAuthentificated } from './../middlewares';
import { addTenant, deleteTenant, editTenant, getTenant, getTenantByID } from './../controllers/tenant';

export default (router : express.Router) =>{
    router.post('/tenant/create', isAuthentificated , addTenant);
    router.get('/tenant/:idUser', isAuthentificated , getTenant);
    router.get('/tenant/id/:idTenant', isAuthentificated , getTenantByID);
    router.put('/tenant/update/:idTenant', isAuthentificated , editTenant);
    router.post('/tenant/delete/:idTenant', isAuthentificated , deleteTenant);
}