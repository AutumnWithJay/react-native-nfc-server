import express from 'express';
import {
  getEmployeeList,
  modifyEmployee,
  registerEmployee,
  removeEmployee,
} from '../controller/EmployeeController';

const EmployeeRouter = express.Router();

EmployeeRouter.get('/', getEmployeeList);
EmployeeRouter.post('/', registerEmployee);
EmployeeRouter.put('/', modifyEmployee);
EmployeeRouter.delete('/', removeEmployee);

export default EmployeeRouter;
