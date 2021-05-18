import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmsDto } from './films.dto';
import { films } from './films.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class filmsService {
  constructor( @InjectRepository(films) private readonly filmsRepository: Repository<films>){}

    findAll () : Promise<any> {
      return this.filmsRepository.find()
    }

    create (data:FilmsDto) {
      if (Object.keys(data).length < 3) {
          return {
            message: 'there is an empty data, please fill it again'
          }
      }
          
      try {
        return this.filmsRepository.save(data)
      } catch (error) {
        return error
      }
    }

    update (data:FilmsDto, id:number) { 
      try {
        return this.filmsRepository.save({...data, id: Number(id)})
      } catch (error) {
        return error
      }
    }

    delete (id:number) { 
      try {
        return this.filmsRepository.delete(id)
      } catch (error) {
        return error
      }
    }
}