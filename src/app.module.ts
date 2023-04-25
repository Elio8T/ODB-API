import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logModule } from './log/log.module';
import { userModule } from './user/user.module';
import { vehicalModule } from './vehical/vehical.module';


@Module({
  imports: [logModule, userModule, vehicalModule, MongooseModule.forRoot(
    'mongodb+srv://Elio:Elio@cluster0.ixwyjp5.mongodb.net/nestjs'
  )],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

