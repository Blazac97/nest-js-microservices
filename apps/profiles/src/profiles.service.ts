// Создаём сервис для работы с профилями.
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Profile } from './prisma/client';
import { PrismaService, PrismaException } from './prisma';
import { RegisterDto } from './dto/register.dto';

import { AUTH_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, tap } from 'rxjs';

@Injectable()
export class ProfilesService {
  constructor(
    private prisma: PrismaService,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy
  ) {}
  // Метод для созадния профиля, помимо этого создаётся и user.
  async create(data: RegisterDto) {
    const { user: createdUser, access_token } = (await firstValueFrom(
      this.authClient.send('register', {
        email: data.email,
        password: data.password,
      })
    )) as { user: any; access_token: string };
    const createdProfile = await this.prisma.profile.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone,
        userId: createdUser.id,
      },
    });
    const response = {
      profile: createdProfile,
      user: createdUser,
      access_token,
    };
    delete response['user']['password'];
    return response;
  }

  // Метод для поиска профиля по id.
  async findOne(
    profileWhereUniqueInput: Prisma.ProfileWhereUniqueInput
  ): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: profileWhereUniqueInput,
    });
  }

  // Метод для редактирования профиля.
  async update(id: number, data: Prisma.ProfileUpdateInput) {
    try {
      const updateProfile = await this.prisma.profile.update({
        where: {
          id: id,
        },
        data,
      });
      return updateProfile;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaException.ENTITY_NOT_FOUND) {
          throw new NotFoundException();
        }
      }

      throw e;
    }
  }

  // Метод для удаления профиля. При удалении профиля, соотвествующий юзер удаляется тоже.
  // В shema.prisma для этих связей используется каскадное удаление.
  async remove(id: number) {
    try {
      const removedProfile = await this.prisma.profile.delete({
        where: {
          id: id,
        },
      });
      // TODO: REMOVE USER!
      return removedProfile;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PrismaException.ENTITY_NOT_FOUND) {
          throw new NotFoundException();
        }
      }

      throw e;
    }
  }
}
