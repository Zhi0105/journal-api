import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';


//  NEST JS COMMAND :
// nest new (project_name) --typescript
// nest g module (module_name)
// nest g controller (controller_name)
// nest g service (service_name) --no-spec


@Module({
  imports: [ AuthModule, UserModule, CategoryModule, PrismaModule ],
})

export class AppModule {}
