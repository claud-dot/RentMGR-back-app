import express from 'express'
import { createTenant,  deleteTenantbyId,  getTenantById,  getTenantByProperty,  getTenants,  updateTenantById } from './../db/tenants';
import { getProperties, getPropertyById } from './../db/property';

export const getTenant = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idUser  = req.params.idUser;
        console.log("Idysye ", idUser);
        
        const properties = await getProperties(idUser);
        const tenants = await getTenants(properties); 
        dataSend.status = 200;
        dataSend.data = tenants;
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const getTenantByID = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idTenant  = req.params.idTenant;
        
        const tenant = await getTenantById(idTenant);
        if(!tenant){
            throw new Error("Tenant don't exist !");
        }
        dataSend.status = 200;
        dataSend.data = tenant;
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const addTenant = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try { 
        const { idProperty , nom , prenom , email , telephone , dateLocation } = req.body;
        
        if(!idProperty || !nom || !prenom || !email || !telephone){
            throw new Error("input required !");
        }

        
        const propertyExist = await getPropertyById(idProperty);
        if(!propertyExist){
            throw new Error("Property not exist !");
        }

        const bienReserved = await getTenantByProperty(idProperty);
        console.log("HUHU ==> ", bienReserved);
        
        if (bienReserved && bienReserved.length>0) {
            throw new Error("Property already reserved !");
        }
        await createTenant({
            idProperty : idProperty,
            nom : nom,
            prenom : prenom,
            email : email,
            telephone : telephone,
            dateLocation : dateLocation
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
        console.log(error);
        
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}