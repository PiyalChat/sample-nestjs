import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureADStrategy } from './authentication/azure-ad.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    AuthenticationModule,
    MongooseModule.forRoot(
      'mongodb+srv://piyal:piyal123@cluster0.ys9sg.mongodb.net/nestjs-employee-demo?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, AzureADStrategy],
})
export class AppModule {}
