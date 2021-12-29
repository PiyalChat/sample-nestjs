import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor() {}

  async addEmployees() {
    return 'Employee is added';
  }

  async getEmployees() {
    return 'You have called get all employees endpoint';
  }

  async getEmployee(empGuid: string) {
    return 'You have called get employee by Id endpoint';
  }

  async updateEmployee() {
    return 'You have called update employee endpoint';
  }

  async removeEmployee() {
    return 'You have called delete employee endpoint';
  }
}
