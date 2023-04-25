import * as mongoose from 'mongoose';

export const vehicalSchema = new mongoose.Schema({
    vehicalID: {type: String, required: true},
    triplog: {type: String, required: true},
    misc: {type: String, required: true},
    GasBal: {type: Number, required: true},
    Miles: {type: Number, required: true},
});


export interface vehical extends mongoose.Document{
    
    id: string;
    vehicalID: string;
    triplog: string;
    misc: string;
    GasBal: number;
    Miles: number;
}




