import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AzureADGuard } from './azure-ad.guard';

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
  @UseGuards(AzureADGuard)
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
