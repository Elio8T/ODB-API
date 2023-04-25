import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    triplog: {type: String, required: true},
    misc: {type: String, required: true},
    GasBal: {type: Number, required: true},
    Miles: {type: Number, required: true},
});


export interface user extends mongoose.Document{
    
    id: string;
    userID: string;
    triplog: string;
    misc: string;
    GasBal: number;
    Miles: number;
}




