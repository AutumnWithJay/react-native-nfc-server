import express from 'express';
import EmployeeRouter from './routes/EmployeeRouter';
import PatrolRouter from './routes/PatrolRouter';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/', EmployeeRouter);
app.use('/patrol', PatrolRouter);

app.listen(PORT, () => {
  console.log(`
        🛡️ Server listening on port: ${PORT} 🛡️
    `);
});
