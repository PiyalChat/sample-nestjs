import { Injectable, NotFoundException } from '@nestjs/common';
import { Authentication } from './authentication.model';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthenticationService {
  private employees: Authentication[] = [];

  constructor(
    @InjectModel('Employee')
    private readonly employeeModel: Model<Authentication>,
  ) {}

  async addEmployees(id: string, name: string, password: string) {
    const generatedId = uuidv4();
    const newEmployee = new this.employeeModel({
      guid: generatedId,
      id,
      name,
      password,
    });
    const result = await newEmployee.save();

    return result._id;
  }

  async getEmployees() {
    return await (
      await this.employeeModel.find().exec()
    ).map((employee) => ({
      guid: employee.guid,
      id: employee.id,
      name: employee.name,
      password: employee.password,
    }));
  }

  async getEmployee(empGuid: string) {
    const employee = await this.findEmployee(empGuid);
    return {
      guid: employee.guid,
      id: employee.id,
      name: employee.name,
      password: employee.password,
    };
  }

  async updateEmployee(
    empGuid: string,
    id: string,
    name: string,
    password: string,
  ) {
    const employee = await this.findEmployee(empGuid);
    if (!id || !name || !password) {
      throw new Error('Not all values were filled');
    }
    employee.id = id;
    employee.name = name;
    employee.password = password;
    await employee.save();
  }

  async removeEmployee(empGuid: string) {
    await this.employeeModel.deleteOne({ guid: empGuid }).exec();
  }

  private async findEmployee(empGuid: string): Promise<Authentication> {
    let employee;
    try {
      employee = await this.employeeModel.findOne({ guid: empGuid }).exec();
    } catch {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }
}
