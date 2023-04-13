import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { RegisterDto } from './dto/register.dto';
import { ValidationFilter } from './filters/validation.filter';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('api/auth/register')
  @UseFilters(new ValidationFilter())
  register(@Body() body: RegisterDto) {
    return this.profilesService.create(body);
  }

  @Post('api/auth/login')
  login() {
    return null;
  }
}
