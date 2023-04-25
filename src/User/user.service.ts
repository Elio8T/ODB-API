import {Injectable, NotFoundException} from '@nestjs/common';
import { user } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {log } from '../log/log.model'


@Injectable()
export class userService{
    
 
    constructor(@InjectModel('user') private readonly userModel: Model<user>, @InjectModel('user') private readonly logModel: Model<log> ) {}


    async insertuser(userID: string, triplog: string, misc: string, GasBal: number, Miles: number ){
       
        
        const newuser = new this.userModel({
            userID: userID, 
            triplog: triplog,
            misc, 
            GasBal,
            Miles,
        });
        const result = await  newuser.save();
        return result.id as string;
     

    }

    async getuser(){
       const users = await  this.userModel.find().exec();
    
        return users.map((user) => ({id: user.id, userID: user.userID, triplog: user.triplog, misc: user.misc, GasBal: user.GasBal, Miles: user.Miles}));
    }

    async getSingleuser(ID: string){
        const user = await this.finduserbyID(ID);
        return {id: user.id, userID: user.userID, triplog: user.triplog, misc: user.misc, GasBal: user.GasBal, Miles: user.Miles};
    }
    async getbyUserID(userID: string){
        const user = await this.finduserbyID(userID);
        return {id: user.id, userID: user.userID, triplog: user.triplog, misc: user.misc, GasBal: user.GasBal, Miles: user.Miles};
    }

    async updateuser(ID: string, userID: string, triplog: string, misc: string, GasBal: number, Miles: number){
        const updateduser = await this.finduser(ID);
        
        if(userID){
            updateduser.userID = userID;
        }
        if(triplog){
            updateduser.triplog = triplog;
        }
        if(misc){
            updateduser.misc = misc;
        }
        if(GasBal){
            updateduser.GasBal = GasBal;
        }
        if(Miles){
            updateduser.Miles = Miles;
        }
        updateduser.save();
    }


    async deleteuser(ID: string){
        const result = await this.userModel.deleteOne({_id: ID}).exec;
        if (result.length ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async finduser(id: string): Promise<user>{
        let user;
        try{
        user = await this.userModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!user){
            throw new NotFoundException('could not find');
        }
        return user;
    }
    private async finduserbyID(userid: string): Promise<user>{
        let user;
        try{

            const a =await this.userModel.find();
            console.log(a[0]);
            console.log(a[0].id);
        
        for(let x = 0; x<a.length; x++){
           // console.log(this.userModel.findOne( userid));
            if(a[x].userID === userid){
                user = await this.userModel.findById(a[x].id).exec();

            }
        }
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!user){
            throw new NotFoundException('could not find');
        }
        return user;
    }

    

    

}