import mongoose from 'mongoose';
import { TenantModel } from './tenants';

const PropertySchema = new mongoose.Schema({
    idUser : { type : mongoose.Schema.Types.ObjectId , required : true },
    type : { type : String , required : true },
    loyer: { type : Number , required : true },
    surface : { type : Number , required : true },
    adresse_postale : { type : String , required : true }
})

export const PropertyModel = mongoose.model('Property', PropertySchema);

export const getProperties = (idUser : string ) =>{
    const userId = new mongoose.Types.ObjectId(idUser);
    return PropertyModel.find({ idUser : userId });
}
export const getPropertyById = (idProperty : string ) => PropertyModel.findById(idProperty);
export const createProperty = (values : Record<string , any>) => new PropertyModel(values).save().then((property)=> property.toObject());
export const updatePropertyById = (idProperty : string , values : Record<string , any>)=> PropertyModel.findByIdAndUpdate(idProperty , values);
export const deletePropertyById = async (idProperty : string) =>{
    await TenantModel.deleteMany({idProperty : idProperty});
    await PropertyModel.findByIdAndDelete(idProperty)
}
