import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config.js';
import errorHandler from './middleware/errorHandler.js';
import root from './routes/index.js';
// import { sequelize } from "./db/index.js";

// try {
//     await sequelize.authenticate();
//     console.log('DB successful conected');
// } catch (err) {
//     console.error('Could not connect to DB, error:', err);
// }

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    origin: config.clientOrigins[config.nodeEnv]
}))

app.use(helmet())
app.use(morgan('tiny'))

// Apply routes before error handling
app.use('/', root)

// Apply error handling last
app.use(errorHandler)

export default app