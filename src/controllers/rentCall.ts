import express from 'express'

const getRentCalls = async (req : express.Request , rep : express.Response) => {
    const dataSend : any = {};
    try {
        const { idProperty , idTenant }  = req.body; 
        dataSend.status = 200;
        dataSend.message = "Tenant created !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
}

const getRentCallsByProperty = async (req : express.Request , rep : express.Response) => {
    const dataSend : any = {};
    try {
        dataSend.status = 200;
        dataSend.message = "Tenant created !";
    } catch (error) {
        dataSend.status = 400;
        dataSend.message = error.message;
    }
}
