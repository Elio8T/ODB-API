import {Injectable, NotFoundException} from '@nestjs/common';
import { vehical } from './vehical.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {log } from '../log/log.model'



@Injectable()
export class vehicalService{
    
 
    constructor(@InjectModel('vehical') private readonly vehicalModel: Model<vehical>,@InjectModel('log') private readonly logModel: Model<log>) {}


    async insertvehical(vehicalID: string, triplog: string, misc: string, GasBal: number, Miles: number ){
       
        
        const newvehical = new this.vehicalModel({
            vehicalID: vehicalID, 
            triplog: triplog,
            misc, 
            GasBal,
            Miles,
        });
        const result = await  newvehical.save();
        return result.id as string;
     

    }

    async getvehical(){
       const vehicals = await  this.vehicalModel.find().exec();
    
        return vehicals.map((vehical) => ({id: vehical.id, vehicalID: vehical.vehicalID, triplog: vehical.triplog, misc: vehical.misc, GasBal: vehical.GasBal, Miles: vehical.Miles}));
    }

    async getSinglevehical(ID: string){
        const vehical = await this.findvehical(ID);
        return {id: vehical.id, vehicalID: vehical.vehicalID, triplog: vehical.triplog, misc: vehical.misc, GasBal: vehical.GasBal, Miles: vehical.Miles};
    }
    async getbyVehicalID(vehicalID: string){
        const vehical = await this.findvehicalbyID(vehicalID);
        return {id: vehical.id, vehicalID: vehical.vehicalID, triplog: vehical.triplog, misc: vehical.misc, GasBal: vehical.GasBal, Miles: vehical.Miles};
    }

    async updatevehical(ID: string, vehicalID: string, triplog: string, misc: string, GasBal: number, Miles: number){
        const updatedvehical = await this.findvehical(ID);
        
        if(vehicalID){
            updatedvehical.vehicalID = vehicalID;
        }
        if(triplog){
            updatedvehical.triplog = triplog;
        }
        if(misc){
            updatedvehical.misc = misc;
        }
        if(GasBal){
            updatedvehical.GasBal = GasBal;
        }
        if(Miles){
            updatedvehical.Miles = Miles;
        }
        updatedvehical.save();
    }


    async deletevehical(ID: string){
        const result = await this.vehicalModel.deleteOne({_id: ID}).exec();
        if (result.deletedCount ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async findvehical(id: string): Promise<vehical>{
        let vehical;
        try{
        vehical = await this.vehicalModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!vehical){
            throw new NotFoundException('could not find');
        }
        return vehical;
    }
    private async findvehicalbyID(vehicalid: string): Promise<vehical>{
        let vehical;
        try{

            const a =await this.vehicalModel.find();
            console.log(a[0]);
            console.log(a[0].id);
        
        for(let x = 0; x<a.length; x++){
           // console.log(this.vehicalModel.findOne( vehicalid));
            if(a[x].vehicalID === vehicalid){
                vehical = await this.vehicalModel.findById(a[x].id).exec();

            }
        }
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!vehical){
            throw new NotFoundException('could not find');
        }
        return vehical;
    }
    async addtrip(vehicalID: string, tripID: string,){
        const updateduser = await this.findvehicalbyID(vehicalID);
        updateduser.triplog += ":"+ tripID;
        updateduser.GasBal += (await this.findlog(tripID)).deltagas;
        updateduser.Miles = (await this.findlog(tripID)).deltaM;
       
        updateduser.save();
    }

    
    private async findlog(id: string): Promise<log>{
        let log;
        try{
        log = await this.logModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!log){
            throw new NotFoundException('could not find');
        }
        return log;
    }
    

}