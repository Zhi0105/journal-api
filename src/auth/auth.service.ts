import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwt: JwtService,
    private config: ConfigService
  ) {}


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
        // delete user.password  
        return this.signToken(user.id, user.username, user.email)

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
    // delete user.password  
    return this.signToken(user.id, user.username, user.email)
  }
  
  async signToken(user_id: number, username: string, email: string): Promise<{ access_token: string }> {
    
    const secret = this.config.get('JWT_SECRET')
    const payload = {
      sub: user_id,
      username,
      email
    }
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret
    })

    return {
      access_token: token
    }
    
  }
}