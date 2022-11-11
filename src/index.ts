import express from 'express';
import EmployeeRouter from './routes/EmployeeRouter';
import { db } from './util/firestore';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/', EmployeeRouter);

app.listen(PORT, () => {
  console.log(`
        🛡️ Server listening on port: ${PORT} 🛡️
    `);
});
