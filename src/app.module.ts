import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    PassportModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
     consumer.apply(AuthMiddleware).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
