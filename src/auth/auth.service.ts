import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}


  async signup(dto: RegisterDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password)
    try {
      // save the new user in the db
        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            username: dto.username,
            password: hash,
          }
        })
        // remove password being seen in response
        delete user.password  
        // return the saved user
        return user 
    }catch(error) {
      if ( error instanceof PrismaClientKnownRequestError ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
    } 
  }

  async signin(dto: LoginDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    // if user does not exist throw exception
    if(!user) throw new ForbiddenException('Credentials incorrect')

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password)
    // if password  incorrect throw exception
    if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
    
    // remove password being seen in response
      delete user.password  
    // send back the user
    return user
  }
  
}