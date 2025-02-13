import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Permissions } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles,Permissions]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
