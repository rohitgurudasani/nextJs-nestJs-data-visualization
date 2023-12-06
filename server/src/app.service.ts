import { Injectable } from '@nestjs/common';
import { User } from './model/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentPerformance } from './model/studentPerformace.schema';
import { JwtService } from '@nestjs/jwt';

export class UserDto {
  email: string;
  password: string;
}

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel('students')
    private readonly studentPerformanceModel: Model<StudentPerformance>,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Data visualization app!';
  }

  async createUser(createUserDto: UserDto): Promise<User> {
    if (!createUserDto?.email || !createUserDto?.password)
      throw new Error('Missing Params');

    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string; expiration: number }> {
    if (!email || !password) throw new Error('Missing Params');

    const user = await this.userModel.findOne({ email, password }).exec();

    if (!user) {
      throw new Error('Please signup.');
    }

    if (user?.password !== password) {
      throw new Error('Wrong Password');
    }
    const payload = {
      sub: user._id,
      username: user.email,
    };
    const expiration = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: expiration,
      // secret: 'secret_key',
    });

    return { message: 'auth success', token, expiration };
  }

  async getChartData() {
    const genderData = await this.studentPerformanceModel.aggregate([
      {
        $group: {
          _id: '$gender',
          avgMathScore: { $avg: '$math score' },
          avgReadingScore: { $avg: '$reading score' },
          avgWritingScore: { $avg: '$writing score' },
        },
      },
    ]);

    const raceData = await this.studentPerformanceModel.aggregate([
      {
        $group: {
          _id: '$race/ethnicity',
          avgMathScore: { $avg: '$math score' },
          avgReadingScore: { $avg: '$reading score' },
          avgWritingScore: { $avg: '$writing score' },
        },
      },
    ]);

    const parentEducationData = await this.studentPerformanceModel.aggregate([
      {
        $group: {
          _id: '$parental level of education',
          avgMathScore: { $avg: '$math score' },
          avgReadingScore: { $avg: '$reading score' },
          avgWritingScore: { $avg: '$writing score' },
        },
      },
    ]);

    const lunchData = await this.studentPerformanceModel.aggregate([
      {
        $group: {
          _id: '$lunch',
          avgMathScore: { $avg: '$math score' },
          avgReadingScore: { $avg: '$reading score' },
          avgWritingScore: { $avg: '$writing score' },
        },
      },
    ]);

    const testPrepData = await this.studentPerformanceModel.aggregate([
      {
        $group: {
          _id: '$test preparation course',
          avgMathScore: { $avg: '$math score' },
          avgReadingScore: { $avg: '$reading score' },
          avgWritingScore: { $avg: '$writing score' },
        },
      },
    ]);

    return {
      genderData: genderData,
      raceData: raceData,
      parentEducationData: parentEducationData,
      lunchData: lunchData,
      testPrepData: testPrepData,
    };

    // return this.studentPerformanceModel.find({}, null, { limit: 50 }).exec();
  }
}
