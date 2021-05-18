import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService){}
   async use(req: Request, res: Response, next: NextFunction) {
 
    try {
          const cookie = req.cookies['token']
          await this.jwtService.verifyAsync(cookie)
          next();
        } catch (error) {
          res.clearCookie('token')
           throw new HttpException(error,HttpStatus.BAD_REQUEST)
           
        }
  }
}