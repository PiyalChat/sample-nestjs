import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AzureADStrategy } from './azure-ad.guard';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Received');

    passport.use(new AzureADStrategy());
    passport.authenticate('azure-ad', (err, user, info) => {
      if (user) {
        return next();
      }
      res.status(401).json({
        statusCode: 401,
        requestedDate: new Date().toISOString(),
        path: req.url,
      });
    })(req, res, next);
  }
}
