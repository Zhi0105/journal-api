import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto)
  }
  
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto)
  }
}