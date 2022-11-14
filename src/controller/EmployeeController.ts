import * as express from 'express';
import { db } from '../util/firestore';

interface typeGuard {
  aptId: string;
  userId: string;
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
  const employeeData: typeGuard = req.body;
  const { aptId, userId, name, phone } = employeeData;

  const employeeRef = await db
    .collection(aptId)
    .doc('employee')
    .collection('list')
    .where('userId', '==', userId)
    .get();

  if (employeeRef.empty) {
    const fbWriteResponse = await db
      .collection(aptId)
      .doc('employee')
      .collection('list')
      .doc()
      .set({
        userId,
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
        message: '직원 등록에 실패하였습니다',
      });
    }
  } else {
    return res.status(200).json({
      message: '이미 등록되어있는 직원입니다',
    });
  }
};

export const modifyEmployee = async (
  req: express.Request,
  res: express.Response,
) => {
  const employeeData: typeGuard = req.body;
  const { aptId, userId, ...data } = employeeData;

  const employeeRef = await db
    .collection(aptId)
    .doc('employee')
    .collection('list')
    .where('userId', '==', userId)
    .get();

  if (employeeRef.empty) {
    return res.status(400).json({
      message: '존재하지 않는 직원입니다',
    });
  } else {
    employeeRef.forEach(async (doc) => {
      console.log(doc);
      if (doc.exists) {
        const findUser = db
          .collection(aptId)
          .doc('employee')
          .collection('list')
          .doc(doc.id);

        await findUser.update({
          ...data,
        });

        return res.status(200).json({
          message: '정보가 업데이트 되었습니다',
        });
      }
    });
  }
};

export const removeEmployee = async (
  req: express.Request,
  res: express.Response,
) => {
  const employeeData: typeGuard = req.body;
  const { userId } = employeeData;

  const employeeRef = await db
    .collection('employee')
    .doc('list')
    .collection('list')
    .where('userId', '==', userId)
    .get();

  employeeRef.forEach((doc) => {});
};
