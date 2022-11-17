import * as express from 'express';
import { db } from '../util/firestore';

interface typePatrol {
  id: string;
  aptId: string;
  userId: string;
  guardName: string;
  areaId: string;
  patrolTime: Date;
}

export const getPatrolList = async (
  req: express.Request,
  res: express.Response,
) => {
  const { aptId } = req.query;

  const patrolListRef = await db
    .collection(aptId)
    .doc('patrol')
    .collection('list')
    .get();

  const data = patrolListRef.docs.map((doc) => {
    const { id } = doc;
    return {
      id,
      ...doc.data(),
    };
  });

  res.status(200).json(data);
};

export const getSpecificPatrol = async (
  req: express.Request,
  res: express.Response,
) => {
  const { aptId, areaId, userId } = req.query;

  const patrolDataRef = await db
    .collection(aptId)
    .doc('patrol')
    .collection('list')
    .where('userId', '==', userId)
    .where('areaId', '==', areaId)
    .get();

  if (patrolDataRef.empty) {
    return res.status(400).json({
      message: '해당되는 데이터가 없습니다',
    });
  } else {
    const data = patrolDataRef.docs.map((doc) => {
      const { id } = doc;
      return {
        id,
        ...doc.data(),
      };
    });
    res.status(200).json(data);
  }
};

export const registerPatrol = async (
  req: express.Request,
  res: express.Response,
) => {
  const patrolData: typePatrol = req.body;
  const { aptId, areaId, guardName, patrolTime } = patrolData;

  const patrolRef = await db
    .collection(aptId)
    .doc('patrol')
    .collection('list')
    .where('areaId', '==', areaId)
    .where('patrolTime', '==', patrolTime)
    .get();

  if (patrolRef.empty) {
    const fbWriteResponse = await db
      .collection(aptId)
      .doc('patrol')
      .collection('list')
      .doc()
      .set({ ...patrolData });

    if (fbWriteResponse) {
      return res.status(201).json({
        message: '순찰정보가 등록되었습니다',
      });
    } else {
      return res.status(400).json({
        message: '순찰정보 등록에 실패하였습니다',
      });
    }
  } else {
    return res.status(200).json({
      message: '오늘은 이미 등록하였습니다',
    });
  }
};

// export const removePatrol = async (
//   req: express.Request,
//   res: express.Response,
// ) => {
//   const patrolData: typePatrol = req.body;
//   const { aptId, id } = patrolData;

//   const patrolDataRef = await db
//     .collection(aptId)
//     .doc('patrol')
//     .collection('list')
//     .where('id', '==', id)
//     .get();
// };
