import express from 'express';
import {
  getPatrolList,
  modifyPatrol,
  registerPatrol,
  removePatrol,
} from '../controller/PatrolController';

const PatrolRouter = express.Router();

PatrolRouter.get('/', getPatrolList);
PatrolRouter.post('/', registerPatrol);
PatrolRouter.put('/', modifyPatrol);
PatrolRouter.delete('/', removePatrol);

export default PatrolRouter;
