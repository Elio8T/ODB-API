import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { userService } from './user.service';
@Controller('user')
export class usersController {
    constructor(private readonly usersService: userService) {}
    
    @Post()
    async adduser(@Body('userID') userID: string, 
    @Body('triplog') usertriplog: string,
    @Body('misc') usergenre: string,
    @Body('GasBal') userGasBal: number,
    @Body('Miles') userMiles: number,
    ) {
        const generatedID = await this.usersService.insertuser(userID, usertriplog, usergenre, userGasBal, userMiles);
        return {id: generatedID};
    }
    @Get()
    async getAlluser(){
        const users = await this.usersService.getuser(); 
        return users;
    }
    @Get(':id')
    getuser(@Param('id') id: string){
        return this.usersService.getSingleuser(id);
        

    }
    @Get('user/:userid')
    getuserbyid(@Param('userid') userid: string){
        return this.usersService.getbyUserID(userid);
    }
    @Patch(':id')
    async updateuser(@Param('id') id: string, @Body('userID') userID: string, @Body('userIDription') usertriplog: string, @Body('misc') usergenre: string, @Body('GasBal') userGasBal: number, @Body('Miles') userMiles: number){
        await this.usersService.updateuser(id, userID, usertriplog, usergenre, userGasBal, userMiles);
        return null;
    }   
    @Delete(':id')
    async removeuser(@Param('id') id: string,){
        await this.usersService.deleteuser(id);
        return null;
    }
}
