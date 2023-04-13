import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { PrismaService } from '../prisma';
import { BcryptService } from '@app/common';
import { Prisma } from '../prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private bcrypt: BcryptService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(data: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: data,
    });
  }
}
