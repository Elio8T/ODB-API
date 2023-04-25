import * as mongoose from 'mongoose';

export const logSchema = new mongoose.Schema({
    carID: {type: String, required: true},
    userID: {type: String, required: true},
    deltagas: {type: Number, required: true},
    deltatime: {type: String, required: true},
    startM: {type: Number, required: true},
    endM: {type: Number, required: true},
    deltaM: {type: Number, required: true},
    startT: {type: String, required: true},
    endT: {type: String, required: true},
    genre: {type: String, required: false},
    EmptySpots: {type: Number, required: false},
});


export interface log extends mongoose.Document{
    
    id: string;
    carID: string;
    userID: string;
    deltagas: number;
    deltatime: string;
    startM: number;
    endM: number;
    deltaM: number;
    startT: string;
    endT: string;
    genre: string;
    EmptySpots: number;
}




