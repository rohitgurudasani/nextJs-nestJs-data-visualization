import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/users.schema';
import {
  StudentPerformance,
  StudentPerformanceSchema,
} from './model/studentPerformace.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './appConstant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      // signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://test:test@cluster0.e3hpkoq.mongodb.net/students_performance?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'students', schema: StudentPerformanceSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
