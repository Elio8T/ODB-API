import {Injectable, NotFoundException} from '@nestjs/common';
import { log } from './log.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class logService{
    
 
    constructor(@InjectModel('log') private readonly logModel: Model<log>) {}


    async insertlog(carID: string, userID: string, deltagas: number,
        deltatime: string,
        startM: number,
        endM: number,
        deltaM: number,
        startT: string,
        endT: string, 
        genre: string, 
        EmptySpots: number ){
       
        
        const newlog = new this.logModel({
            carID: carID, 
            userID: userID,
            deltagas: deltagas,
            deltatime: deltatime,
            startM: startM,
            endM: endM,
            deltaM: deltaM,
            startT: startT,
            endT: endT,
            genre, 
            EmptySpots,
        });
        const result = await  newlog.save();
        return result.id as string;
     

    }

    async getlog(){
       const logs = await  this.logModel.find().exec();
    
        return logs.map((log) => ({id: log.id, carID: log.carID, userID: log.userID, deltagas: log.deltagas, deltatime: log.deltatime, startM: log.startM, endM: log.endM, deltaM: log.deltaM, startT: log.startT, endT: log.endT, genre: log.genre, EmptySpots: log.EmptySpots}));
    }

    async getSinglelog(logId: string){
        const log = await this.findlog(logId);
        return {id: log.id, carID: log.carID, userID: log.userID, deltagas: log.deltagas, deltatime: log.deltatime, startM: log.startM, endM: log.endM, deltaM: log.deltaM, startT: log.startT, endT: log.endT, genre: log.genre, EmptySpots: log.EmptySpots};
    }
    async getbyUserID(userID: string){
        const logs= await this.finduserbyID(userID);
        return logs.map((log)=>({id: log.id, carID: log.carID, userID: log.userID, deltagas: log.deltagas, deltatime: log.deltatime, startM: log.startM, endM: log.endM, deltaM: log.deltaM, startT: log.startT, endT: log.endT, genre: log.genre, EmptySpots: log.EmptySpots}));
    }
    async getbyvehicalID(vehicalID: string){
        const logs= await this.findvehicalbyID(vehicalID);
        return logs.map((log)=>({id: log.id, carID: log.carID, userID: log.userID, deltagas: log.deltagas, deltatime: log.deltatime, startM: log.startM, endM: log.endM, deltaM: log.deltaM, startT: log.startT, endT: log.endT, genre: log.genre, EmptySpots: log.EmptySpots}));
    }

    async updatelog(logId: string, carID: string, userID: string, 
        deltagas: number,
        deltatime: string,
        startM: number,
        endM: number,
        deltaM: number,
        startT: string,
        endT: string, 
        genre: string, EmptySpots: number){
        const updatedlog = await this.findlog(logId);
        
        if(carID){
            updatedlog.carID = carID;
        }
        if(userID){
            updatedlog.userID = userID;
        }
        if(deltagas){
            updatedlog.deltagas = deltagas;
        }
        if(deltatime){
            updatedlog.deltatime = deltatime;
        }
        if(startM){
            updatedlog.startM = startM;
        }
        if(endM){
            updatedlog.endM = endM;
        }
        if(deltaM){
            updatedlog.deltaM = deltaM;
        }if(startT){
            updatedlog.startT = startT;
        }
        if(endT){
            updatedlog.endT = endT;
        }
        if(genre){
            updatedlog.genre = genre;
        }
        if(EmptySpots){
            updatedlog.EmptySpots = EmptySpots;
        }
        updatedlog.save();
    }


    async deletelog(logId: string){
        const result = await this.logModel.deleteOne({_id: logId}).exec();
        if (result.deletedCount ===0){
            throw new NotFoundException('could not find');
        }
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

    private async finduserbyID(userid: string): Promise<log[]>{
        const logs = [];
        try{

            const a =await this.logModel.find();
            
        
        for(let x = 0; x<a.length; x++){
           
            if(a[x].userID === userid){
                logs.push(await this.logModel.findById(a[x].id).exec());

            }
        }
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!logs){
            throw new NotFoundException('could not find');
        }
        return logs;
    }
    private async findvehicalbyID(carid: string): Promise<log[]>{
        const logs = [];
        try{

            const a =await this.logModel.find();
            
        
        for(let x = 0; x<a.length; x++){
           
            if(a[x].carID === carid){
                logs.push(await this.logModel.findById(a[x].id).exec());

            }
        }
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!logs){
            throw new NotFoundException('could not find');
        }
        return logs;
    }

    

}