import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('employees')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post()
  async addEmployee(
    @Body('id') empId: string,
    @Body('name') empName: string,
    @Body('password') empPassword: string,
  ) {
    const generatedId = await this.authenticationService.addEmployees(
      empId,
      empName,
      empPassword,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllEmployees() {
    return await this.authenticationService.getEmployees();
  }

  @Get(':guid')
  async getEmployee(@Param('guid') empGuid: string) {
    return await this.authenticationService.getEmployee(empGuid);
  }

  @Patch(':guid')
  async updateEmployee(
    @Param('guid') empGuid: string,
    @Body('id') empId: string,
    @Body('name') empName: string,
    @Body('password') empPassword: string,
  ) {
    await this.authenticationService.updateEmployee(
      empGuid,
      empId,
      empName,
      empPassword,
    );
  }

  @Delete(':guid')
  async removeEmployee(@Param('guid') empGuid: string) {
    await this.authenticationService.removeEmployee(empGuid); 
  }
}
