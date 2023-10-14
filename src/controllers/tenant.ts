import express from 'express'
import { createTenant,  deleteTenantbyId,  getTenantById,  getTenants,  updateTenantById } from './../db/tenants';
import { getPropertyById } from './../db/property';

export const getTenant = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idProperty  = req.params.idProperty;
        const propertyExist = await getPropertyById(idProperty);
        if(!propertyExist){
            throw new Error("Property not exist !");
        }
        const tenants = await getTenants(idProperty); 
        dataSend.status = 200;
        dataSend.data = tenants;
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const addTenant = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idProperty : string = req.params.idProperty; 
        const { nom , prenom , adresse_postale , email , telephone } = req.body;
        
        if(!idProperty || !nom || !prenom || !adresse_postale || !email || !telephone){
            throw new Error("input required !");
        }
        const propertyExist = await getPropertyById(idProperty);
        if(!propertyExist){
            throw new Error("Property not exist !");
        }

        await createTenant({
            idProperty : idProperty,
            nom : nom,
            prenom : prenom,
            adresse_postale : adresse_postale,
            email : email,
            telephone : telephone
        })
        dataSend.status = 200;
        dataSend.message = "Tenant created !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const editTenant = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idTenant : string = req.params.idTenant;
        const dataToUpdate = req.body;
        if(!dataToUpdate || Object.keys(dataToUpdate).length<=0){
            throw new Error("Data to update missing !");
            
        }
        const tenantExist = await getTenantById(idTenant);
        if(!tenantExist){
            throw new Error("Tenant not exist !");
        }
        await updateTenantById(idTenant , dataToUpdate);
        dataSend.status = 200;
        dataSend.message = "Tenant upadated !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const deleteTenant = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idTenant : string = req.params.idTenant;
        const tenantExist = await getTenantById(idTenant);
        if(!tenantExist){
            throw new Error("Tenant not exist !");
        }
        await deleteTenantbyId(idTenant);
        dataSend.status = 200;
        dataSend.message = "Tenant deleted !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}