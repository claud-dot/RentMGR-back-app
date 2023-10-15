import express from "express";
import { generateHTML,  getDatePayInfo } from "./../helpers";
import { getUserById } from "./../db/users";
import { getTenantById } from "./../db/tenants";
import { getPropertyById } from "./../db/property";
import { sendMail } from "./../helpers/mail-sender";


export const sendQuittance = async (req : express.Request , res : express.Response)=>{
    const dataSend : any = {}
    try {
        const { subject , idUser , idTenant } = req.body;

        if(!subject || !idUser || !idTenant){
            throw new Error("Data missing !");
        }

        const user = await getUserById(idUser);
        if(!user){
            throw new Error("User don't exist !");
        }

        
        const tenant =  await getTenantById(idTenant);
        if(!tenant){
            throw new Error("Tenant don't exist !");
        }

        const property = await getPropertyById(tenant.idProperty.toString());
        if(!property){
            throw new Error("Property don't exist !");
        }

        const  dateInfo: any = getDatePayInfo();

        const dataToReplace : any = {
            nom_proprio : user.nom + ' '+user.prenom,
            address_proprio : '4 rue de Paris, 75016 Paris',
            tel_proprio : '06 98 76 54',
            email_proprio : user.email,
            nom_locataire : tenant.nom+' '+tenant.prenom,
            bien_address : property.adresse_postale,
            date_quittance : dateInfo.dateQuittance,
            date_paiment : dateInfo.datePaiement,
            date_location : dateInfo.moisLocation,
            bien_loyer : property.loyer
        }
        const html = await generateHTML('quittance.html', dataToReplace);
        await sendMail(user.email , subject , html);
        dataSend.status = 200;
        dataSend.message = "Quittence sended !";
    } catch (error) {
        console.log(error);
        
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}