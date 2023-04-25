import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { vehicalsController } from './vehical.controller';
import { vehicalService } from './vehical.service';
import { vehicalSchema } from './vehical.model';
@Module({
    imports: [MongooseModule.forFeature([{name: 'vehical', schema: vehicalSchema}])],
    controllers: [vehicalsController],
    providers: [vehicalService],

})

export class vehicalModule {}