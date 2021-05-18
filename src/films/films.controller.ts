import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { FilmsDto } from './films.dto';
import { filmsService } from './films.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {Request, Response} from 'express';

@Controller('api')
export class FilmsController {
  constructor(
      private jwtService: JwtService,
    private readonly filmsService: filmsService
    ) {}

    @Get('films/')
    async findAll (@Req() request:Request)  {
        try {
            return this.filmsService.findAll()
        } catch (error) {
            return error; 
        }
    }

    @Post('films/create')
    async create (@Body() data:FilmsDto) {
        try {
            return this.filmsService.create(data)
        } catch (error) {
            return error;
        }
    }

    @Patch('films/:id')
    async update (@Body() data:FilmsDto, @Param('id') id: number) {
        try {
            return this.filmsService.update(data, id)
        } catch (error) {
            return error;
        }
    }

    @Delete('films/:id')
    // @HttpCode(HttpStatus.NO_CONTENT)
    async delete ( @Param('id') id: number) {
        try {
           const data = await this.filmsService.delete(id)
           if (data.affected === 0) {
               return {message: 'Id Not Found'}
           }
            return {message: 'deleted successfully'}
        } catch (error) {
            return error;
        }
    }

  }
