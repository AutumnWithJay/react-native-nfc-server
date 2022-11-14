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

  const employeeRef = await db
    .collection(aptId)
    .doc('employee')
    .collection('list')
    .get();

  employeeRef.forEach((doc) => {
    const employee = doc.data();
    employees.push(employee);
  });

  if (employees.length === 0) {
    return res.status(200).json({
      message: '데이터를 찾을수 없습니다',
    });
  } else {
    return res.status(200).json({
      data: employees,
    });
  }
};

export const registerEmployee = async (
  req: express.Request,
  res: express.Response,
) => {
  let isExist: boolean = false;
  const employeeData: typeGuard = req.body;
  const { aptId, name, phone } = employeeData;

  const employeeRef = await db
    .collection(aptId)
    .doc('employee')
    .collection('list')
    .where('name', '==', name)
    .where('phone', '==', phone)
    .get();

  employeeRef.forEach((doc) => {
    return doc.data() ? (isExist = true) : (isExist = false);
  });

  if (!!isExist) {
    res.status(200).json({
      message: '이미 등록되어있는 직원입니다',
    });
  } else {
    const fbWriteResponse = await db
      .collection(aptId)
      .doc('employee')
      .collection('list')
      .doc()
      .set({
        name,
        phone,
        registerDate: new Date(),
      });

    if (fbWriteResponse) {
      res.status(201).json({
        message: '직원이 등록되었습니다',
      });
    } else {
      res.status(400).json({
        message: '등록에 실패하였습니다',
      });
    }
  }
};
