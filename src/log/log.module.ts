import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { logsController } from './log.controller';
import { logService } from './log.service';
import { logSchema } from './log.model';
@Module({
    imports: [MongooseModule.forFeature([{name: 'log', schema: logSchema}])],
    controllers: [logsController],
    providers: [logService],

})

export class logModule {}