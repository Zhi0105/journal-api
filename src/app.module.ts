import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ 
      ConfigModule.forRoot({
        isGlobal: true
      }),
      AuthModule, 
      UserModule, 
      CategoryModule, 
      PrismaModule 
    ],
})

export class AppModule {}
