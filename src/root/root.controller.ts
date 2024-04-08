import { Controller, Get } from '@nestjs/common';

@Controller('')
export class RootController {
  @Get('')

  root() {
    return "Journal App API"
  }

}

