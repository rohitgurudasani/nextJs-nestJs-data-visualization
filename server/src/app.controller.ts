import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AppService, UserDto } from './app.service';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('signup')
  async create(@Body() createUserDto: UserDto, @Res() res: Response) {
    try {
      const result = await this.appService.createUser(createUserDto);
      res.status(200).json(result);
      return result;
    } catch (error) {
      console.log('error', error);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
          message: error?.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Public()
  @Post('login')
  async login(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const result = await this.appService.login(
        userDto?.email,
        userDto?.password,
      );
      res.status(200).json(result);
      return result;
    } catch (error) {
      console.log('error', error);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error,
          message: error?.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('chart/all')
  async findOne(@Res() res: Response) {
    try {
      const result = await this.appService.getChartData();
      res.status(200).json(result);
      return result;
    } catch (error) {
      console.log('error', error);

      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error?.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
