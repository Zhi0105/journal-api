import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { RootModule } from './root/root.module';

@Module({
  imports: [ 
      ConfigModule.forRoot({
        isGlobal: true
      }),
      AuthModule, 
      UserModule, 
      CategoryModule,
      TaskModule, 
      PrismaModule, RootModule  
    ],
})

export class AppModule {}
