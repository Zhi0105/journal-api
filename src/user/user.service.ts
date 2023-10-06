import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async UpdateUser (user_id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        ...dto
      }
    })

    delete user.password
    return user
  }
}
