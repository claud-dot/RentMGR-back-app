import mongoose from "mongoose";

const RentCallSchema = new mongoose.Schema({
    idTenant : { type : mongoose.Types.ObjectId , require : true },
    date : { type : Date , required: true },
    amount : { type : Number , required : true }
})

export const RentCallModel = mongoose.model('RentCall', RentCallSchema);

export const getRentCalls = (idTenant : string )=>{
    const tenant_id = new mongoose.Types.ObjectId(idTenant);
    return RentCallModel.find({idTenant : tenant_id});
}

export const getRentCallsByProperty = (idLocataire : string)=> {
    const location_id = new mongoose.Types.ObjectId(idLocataire);
    return RentCallModel.find({idTenant : location_id});
}
export const createRentCall = (values : Record<string , any>) => new RentCallModel(values).save().then((rentCall)=> rentCall.toObject());