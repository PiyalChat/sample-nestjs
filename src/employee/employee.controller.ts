import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post()
  async addEmployee() {
    return await this.employeeService.addEmployees();
  }

  @Get()
  async getAllEmployees() {
    return await this.employeeService.getEmployees();
  }

  @Get(':guid')
  async getEmployee(@Param('guid') empGuid: string) {
    return await this.employeeService.getEmployee(empGuid);
  }

  @Patch(':guid')
  async updateEmployee() {
    return await this.employeeService.updateEmployee();
  }

  @Delete(':guid')
  async removeEmployee() {
    return await this.employeeService.removeEmployee();
  }
}
