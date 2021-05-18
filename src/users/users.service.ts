import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class usersService {
  constructor( @InjectRepository(users) private readonly usersRepository: Repository<users>){}

    create (data:UsersDto) : Promise<any> {
      return this.usersRepository.save(data).catch((error) => {
        return {
            code: error.code,
            message: error.message
        }
      })
    }

    findOne (data) : Promise<any> {
      return this.usersRepository.findOne({ where: { email: data.email } })
    }

}