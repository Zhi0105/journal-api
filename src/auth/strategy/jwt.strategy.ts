import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "@src/prisma/prisma.service";

interface validateInterface {
  sub: number,
  email: string,  
}


@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt'
  ) {
  
    constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')
    })
  }

  async validate(payload: validateInterface){
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })
    delete user.password // remove user password on response!
    return user
  } 
}