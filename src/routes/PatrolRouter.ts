import express from 'express';
import {
  getPatrolList,
  getSpecificPatrol,
  registerPatrol,
  // removePatrol,
} from '../controller/PatrolController';

const PatrolRouter = express.Router();

PatrolRouter.get('/', getPatrolList);
PatrolRouter.get('/', getSpecificPatrol);
PatrolRouter.post('/', registerPatrol);
// PatrolRouter.delete('/', removePatrol);

export default PatrolRouter;
