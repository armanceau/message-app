import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService,) {}

  async findAll() {
    return this.prisma.user.findMany({
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        conversations: true,
        messages: true,
      },
    });
  }

  async createUser(data: { username: string; password: string; email?: string }) {
    try{
      return await this.prisma.user.create({ data });
    }
    catch(error){
      if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException({
        message: "Nom d'utilisateur déjà utilisé",
        code: "USERNAME_TAKEN",
      });
    }
    throw error;
  }
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Nom d'utilisateur ou mot de passe invalide");
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } 
}
