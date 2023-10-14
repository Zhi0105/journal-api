import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import * as argon from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async UpdateUser (user_id: number, dto: UpdateUserDto) {
    
    if(dto.password){
      let hash = await argon.hash(dto.password)
      let user = await this.prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          username: dto.username,
          email: dto.email,
          password: hash
        }
      })
      
      delete user.password
      return user
    }
    let user = await this.prisma.user.update({
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
