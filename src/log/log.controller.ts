import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { logService } from './log.service';
@Controller('log')
export class logsController {
    constructor(private readonly logService: logService) {}
    
    @Post()
    async addlog(@Body('carID') carID: string, 
    @Body('userID') loguserID: string,
    @Body('deltagas') logdeltagas: number,
    @Body('deltatime') logdeltatime: string,
    @Body('startM') logstartM: number,
    @Body('endM') logendM: number,
    @Body('deltaM') logdeltaM: number,
    @Body('startT') logstartT: string,
    @Body('endT') logendT: string,
    @Body('genre') loggenre: string,
    @Body('EmptySpots') logEmptySpots: number,
    ) {
        const generatedID = await this.logService.insertlog(carID, loguserID, logdeltagas, logdeltatime, logstartM, logendM, logdeltaM, logstartT, logendT, loggenre, logEmptySpots);
        return {id: generatedID};
    }
    @Get()
    async getAlllog(){
        const logs = await this.logService.getlog(); 
        return logs;
    }
    @Get(':id')
    getlog(@Param('id') logID: string){
        return this.logService.getSinglelog(logID);

    }
    @Patch(':id')
    async updatelog(@Param('id') logID: string, @Body('carID') carID: string, @Body('userID') loguserID: string, @Body('deltagas') logdeltagas: number, @Body('deltatime') logdeltatime: string, @Body('startM') logstartM: number, @Body('startM') logendM: number, @Body('deltaM') logdeltaM: number, @Body('startT') logstartT: string, @Body('endT') logendT: string,@Body('genre') loggenre: string, @Body('EmptySpots') logEmptySpots: number){
        await this.logService.updatelog(logID, carID, loguserID, logdeltagas, logdeltatime, logstartM, logendM, logdeltaM, logstartT, logendT, loggenre, logEmptySpots);
        return null;
    }   
    @Delete(':id')
    async removelog(@Param('id') logID: string,){
        await this.logService.deletelog(logID);
        return null;
    }
    //user id test

    @Get('user/:userid')
    getuserbyid(@Param('userid') userid: string){
        return this.logService.getbyUserID(userid);
    }
    @Get('vehical/:vehicalid')
    getvehicalbyid(@Param('vehicalid') userid: string){
        console.log("running get veh");
        return this.logService.getbyvehicalID(userid);
    }
}
