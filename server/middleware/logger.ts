import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Request: ${req.protocol}://${req.get('host')}${req.originalUrl} ;; Time: ${moment().format()}`);
    next();
};

export default logger;