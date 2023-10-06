import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '@src/auth/decorator';
import { JwtGuard } from '@src/auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor( private userService: UserService ) {}
  @Get('me')  
  getUsers(
    @GetUser() user: User, 
    // @GetUser('email') email:string
  ) {
    // console.log({
    //   email
    // })
    return user
  }

  @Patch('update')
  editUser(
    @GetUser('id') user_id: number, 
    @Body() dto: UpdateUserDto) {
      return this.userService.UpdateUser(user_id, dto)
  } 
}
