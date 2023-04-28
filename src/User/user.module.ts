import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usersController } from './user.controller';
import { userService } from './user.service';
import { userSchema } from './user.model';
import { logSchema } from '../log/log.model';
@Module({
    imports: [MongooseModule.forFeature([{name: 'user', schema: userSchema}]), MongooseModule.forFeature([{name: 'log', schema: logSchema}])],
    controllers: [usersController],
    providers: [userService],

})

export class userModule {}