import * as express from 'express';
import { db } from '../util/firestore';

interface typeGuard {
  aptId: string;
  id: string;
  name: string;
  phone: string;
}

export const getEmployeeList = async (
  req: express.Request,
  res: express.Response,
) => {
  const { aptId } = req.query;
  const employees: string[] = [];

  const employeeRef = await db.collection(aptId).get();

  employeeRef.forEach((doc) => {
    const employee = doc.data();
    employees.push(employee);
  });

  if (employees.length === 0) {
    return res.status(400).send('데이터를 찾을수 없습니다');
  } else {
    return res.status(200).json(employees);
  }
};

export const registerEmployee = async (
  req: express.Request,
  res: express.Response,
) => {
  const employeeData: typeGuard = req.body;
  const { aptId, id, name, phone } = employeeData;

  const fbWriteResponse = await db.collection(aptId).doc(id).set({
    id,
    name,
    phone,
    registerDate: new Date(),
  });

  console.log(fbWriteResponse);

  res.status(201).send('직원이 등록되었습니다');
};
