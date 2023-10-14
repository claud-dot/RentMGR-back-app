import mongoose from "mongoose";

const RentCallSchema = new mongoose.Schema({
    idTenant : { type : mongoose.Types.ObjectId , require : true },
    idProperty : { type : mongoose.Types.ObjectId , require : true  },
    date : { type : Date , required: true },
    amount : { type : Number , required : true }
})

export const RentCallModel = mongoose.model('RentCall', RentCallSchema);

export const getRentCalls = (idTenant : string , idProperty : string)=>{
    const tenant_id = new mongoose.Types.ObjectId(idTenant);
    const property_id = new mongoose.Types.ObjectId(idProperty);
    return RentCallModel.find({idTenant : tenant_id , idProperty : property_id});
}

export const getRentCallsByProperty = (idProperty : string)=> {
    const property_id = new mongoose.Types.ObjectId(idProperty);
    return RentCallModel.find({idTenant : property_id});
}
export const createRentCall = (values : Record<string , any>) => new RentCallModel(values).save().then((rentCall)=> rentCall.toObject());