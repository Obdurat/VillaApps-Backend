import express from "express";
import { endpoints } from "./routes";
import helmet from 'helmet'
import cors from 'cors'
import { ErrorHandler } from "./middleware/error.handler";
import morgan from 'morgan';
// Check https://github.com/davidbanham/express-async-errors for more info
require('express-async-errors');

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
  }

  start(port: number, callback: () => void) {
    this.app.listen(port, callback);
  }

  private middleware() {
    // Check https://github.com/expressjs/morgan for more info
    // Check https://github.com/expressjs/cors for more info
    this.app.use(cors({ origin: '*' }));
    this.app.use(morgan('[:date] :method :url :status - :user-agent'));
    this.app.use(express.json());
    // Check https://github.com/helmetjs/helmet for more info
    this.app.use(helmet());
    this.app.use(ErrorHandler)
    this.app.use(endpoints);
    // Add more middlewares as needed here
  }
}

export default new App;