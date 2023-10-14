import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
    idProperty : { type : mongoose.Schema.Types.ObjectId , required : true },
    nom : { type : String , required : true },
    prenom : { type : String , required : true },
    adresse_postale : { type : String , required : true },
    email : { type :String , required : true },
    telephone : { type :String , required : true }
});

export const TenantModel = mongoose.model('Tenant' , TenantSchema);

export const getTenants = (idProperty : string)=> {
    const property_id = new mongoose.Types.ObjectId(idProperty);
    return TenantModel.find({idProperty : property_id});
}
export const getTenantById = (idTenant :string)=>TenantModel.findById(idTenant);
export const createTenant = (values : Record<string,any>)=> new TenantModel(values).save().then((tenant)=> tenant.toObject());
export const updateTenantById =(idTenant :string,values : Record<string , any>)=>TenantModel.findByIdAndUpdate(idTenant , values);
export const deleteTenantbyId = (idTenant :string)=>TenantModel.findByIdAndDelete(idTenant);
