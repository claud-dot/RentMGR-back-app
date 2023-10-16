import express from "express";
import { generateHTML,  getDatePayInfo } from "./../helpers";
import { getUserById } from "./../db/users";
import { getTenants } from "./../db/tenants";
import { getProperties } from "./../db/property";
import { sendMail } from "./../helpers/mail-sender";
import { createRentCall } from "./../db/rentCall";


export const sendQuittance = async (req : express.Request , res : express.Response)=>{
    const dataSend : any = {}
    try {
        const idUser = req.params.idUser;

        const user = await getUserById(idUser);
        if(!user){
            throw new Error("User don't exist !");
        }
        
        const properties = await getProperties(idUser);
        const locataires = await getTenants(properties); 

        const  dateInfo: any = getDatePayInfo();
        locataires.forEach(async (element : any) => {
            const dataToReplace : any = {
                nom_proprio : user.nom + ' '+user.prenom,
                address_proprio : '4 rue de Paris, 75016 Paris',
                tel_proprio : '06 98 76 54',
                email_proprio : user.email,
                nom_locataire : element.tenant.nom+' '+element.tenant.prenom,
                bien_address : element.property.adresse_postale,
                date_quittance : dateInfo.dateQuittance,
                date_paiment : dateInfo.datePaiement,
                date_location : dateInfo.moisLocation,
                bien_loyer : element.property.loyer
            }
            const html = await generateHTML('quittance.html', dataToReplace);
            await sendMail(user.email , "Appel au loyer du "+dateInfo.moisLocation , html);
            await sendMail(element.tenant.email , "Appel au loyer du "+dateInfo.moisLocation , html);
            await createRentCall({
                idUser : idUser,
                idLocataire : element.tenant._id,
                montant : element.property.loyer,
                date : dateInfo.dateQuittance,
            })
        });


        dataSend.status = 200;
        dataSend.message = "Quittence sended !";
    } catch (error) {
        console.log(error);
        
        dataSend.status = 400;
        dataSend.message = error.message;
    }
    res.send(dataSend);
}