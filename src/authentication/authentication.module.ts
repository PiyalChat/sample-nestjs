import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { EmployeeSchema } from './authentication.model';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Employee',schema: EmployeeSchema}])],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
