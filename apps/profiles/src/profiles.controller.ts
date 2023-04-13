import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('auth/register')
  register(@Body() body: RegisterDto) {
    return this.profilesService.create(body);
  }

  @Post('auth/login')
  login() {
    return null;
  }
}
