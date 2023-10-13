import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom :  { type: String, required: true },
    email: { type: String, required: true },
    authentification: {
        password: { type: String, required: true},
        salt: { type: String },
        sessionToken: { type: String },
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user : any) => user.toObject());