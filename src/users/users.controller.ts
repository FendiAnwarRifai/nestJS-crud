import { BadRequestException, Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { usersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express';

@Controller('api')
export class UsersController {
  constructor(
    private readonly usersService: usersService,
    private jwtService: JwtService,
    ) {}

  @Post('/register')
  async register (@Body() data:UsersDto) {
    const hashPassword = await bcrypt.hash(data.password, 12)

    data.password = hashPassword
      return this.usersService.create(data)
  }

  @Post('/login')
  async login (@Body() data:UsersDto, @Res({passthrough:true}) response:Response ) {
      const user = await this.usersService.findOne(data)

      if (!user) {
        throw new BadRequestException('User Not Found') 
      }
      else if (!await bcrypt.compare(data.password,user.password)) {
          throw new BadRequestException('Password Wrong!')
      }
      delete user.password
      const payload = { id:user.userId, name: user.username, email:user.email }
      const jwt = await this.jwtService.sign(payload)
      user.token = jwt
      response.cookie('token', jwt, {httpOnly:true} )
      return user
  }
  
  @Post('/logout')
  async  logout (@Res({passthrough:true}) response:Response ) {
    response.clearCookie('token')
    return {
      message: 'logout success'
    }
  }
  }
