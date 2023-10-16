import mongoose, { Document, Model } from "mongoose";
import { PropertyModel } from "./property";

const TenantSchema = new mongoose.Schema({
    idProperty : { type : mongoose.Schema.Types.ObjectId , required : true },
    nom : { type : String , required : true },
    prenom : { type : String , required : true },
    email : { type :String , required : true },
    telephone : { type :String , required : true },
    dateLocation : { type : String , required : true}
});

export const TenantModel = mongoose.model('Tenant' , TenantSchema);

export const getTenants = async (properties: any[])=> {
    const propertyIds = properties.map((property : any) => property._id);
    const tenants = await TenantModel.find({ idProperty: { $in: propertyIds } });
    const tenatIdProperty = tenants.map((property : any) => property.idProperty);

    const propertiesOfTenants = await PropertyModel.find({ _id: { $in: tenatIdProperty } })
    const tenantsWithProperties = tenants.map((tenant) => {
        const property = propertiesOfTenants.find((property) => property._id.equals(tenant.idProperty));
        return {
          tenant: tenant,
          property: property,
        };
      });
    
    return tenantsWithProperties;
}

export const getTenantByProperty = (idProperty : string) =>{
    const property_id = new mongoose.Types.ObjectId(idProperty);
    return TenantModel.find({ idProperty : property_id });
}
export const getTenantById = (idTenant :string)=>TenantModel.findById(idTenant);
export const createTenant = (values : Record<string,any>)=> new TenantModel(values).save().then((tenant)=> tenant.toObject());
export const updateTenantById =(idTenant :string,values : Record<string , any>)=>TenantModel.findByIdAndUpdate(idTenant , values);
export const deleteTenantbyId = (idTenant :string)=>TenantModel.findByIdAndDelete(idTenant);
