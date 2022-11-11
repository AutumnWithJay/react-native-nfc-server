import express from 'express';
import {
  getEmployeeList,
  registerEmployee,
} from '../controller/EmployeeController';

const EmployeeRouter = express.Router();

EmployeeRouter.get('/', getEmployeeList);
EmployeeRouter.post('/', registerEmployee);

export default EmployeeRouter;
