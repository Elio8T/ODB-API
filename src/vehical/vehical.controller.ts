import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { vehicalService } from './vehical.service';
@Controller('vehical')
export class vehicalsController {
    constructor(private readonly vehicalsService: vehicalService) {}
    
    @Post()
    async addvehical(@Body('vehicalID') vehicalID: string, 
    @Body('triplog') vehicaltriplog: string,
    @Body('misc') vehicalgenre: string,
    @Body('GasBal') vehicalGasBal: number,
    @Body('Miles') vehicalMiles: number,
    ) {
        const generatedID = await this.vehicalsService.insertvehical(vehicalID, vehicaltriplog, vehicalgenre, vehicalGasBal, vehicalMiles);
        return {id: generatedID};
    }
    @Get()
    async getAllvehical(){
        const vehicals = await this.vehicalsService.getvehical(); 
        return vehicals;
    }
    @Get(':id')
    getvehical(@Param('id') id: string){
        return this.vehicalsService.getSinglevehical(id);
        

    }
    @Get('vehical/:vehicalid')
    getvehicalbyid(@Param('vehicalid') vehicalid: string){
        return this.vehicalsService.getbyVehicalID(vehicalid);
    }
    @Patch(':id')
    async updatevehical(@Param('id') id: string, @Body('vehicalID') vehicalID: string, @Body('vehicalIDription') vehicaltriplog: string, @Body('misc') vehicalgenre: string, @Body('GasBal') vehicalGasBal: number, @Body('Miles') vehicalMiles: number){
        await this.vehicalsService.updatevehical(id, vehicalID, vehicaltriplog, vehicalgenre, vehicalGasBal, vehicalMiles);
        return null;
    }   
    @Delete(':id')
    async removevehical(@Param('id') id: string,){
        await this.vehicalsService.deletevehical(id);
        return null;
    }
}
