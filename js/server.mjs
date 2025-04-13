import express from 'express';
import dotenv from 'dotenv';
import routerApi from './server/api.mjs';
import morgan from 'morgan';
import cors from 'cors';


dotenv.config();

const port = process.env.PORT || 3000;
const api_prefix = process.env.API_PREFIX || 'api';
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))

app.use(`/${api_prefix}`, routerApi);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


