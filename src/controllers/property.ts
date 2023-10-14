import { createProperty, deletePropertyById, getProperties, getPropertyById, updatePropertyById } from './../db/property';
import express from 'express'

export const getAllProperty = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idUser   = req.params.idUser;
        const properties = await getProperties(idUser); 
        dataSend.status = 200;
        dataSend.data = properties;
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const createProperties = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idUser : string = req.params.idUser; 
        const {type , loyer , surface , adresse_postale } = req.body;
        if(!idUser || !type || !loyer || !surface || !adresse_postale){
            throw new Error("Input required !");
        }
        await createProperty({
            idUser : idUser,
            type : type ,
            loyer : loyer,
            surface : surface,
            adresse_postale : adresse_postale
        })
        dataSend.status = 200;
        dataSend.message = "Property created !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const editProperty = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idProperty = req.params.idProperty;
        const dataToUpdate =  req.body;
        
        if(!dataToUpdate || Object.keys(dataToUpdate).length<=0){
            throw new Error("Data to update missing !");
            
        }
        const propertyExist = await getPropertyById(idProperty);
        if(!propertyExist){
            throw new Error("Property not exist !");
        }
        await updatePropertyById(idProperty , dataToUpdate);
        dataSend.status = 200;
        dataSend.message = "Property updated !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}

export const deleteProperty = async (req : express.Request , res : express.Response) => {
    const dataSend : any = {};
    try {
        const idProperty = req.params.idProperty;
        const propertyExist = await getPropertyById(idProperty);
        if(!propertyExist){
            throw new Error("Property not exist !");
        }
        await deletePropertyById(idProperty);
        dataSend.status = 200;
        dataSend.message = "Property deleted !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}