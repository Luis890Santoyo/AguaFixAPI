import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password: _password, ...usuarioSinPassword } = user;
    return usuarioSinPassword;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const passwordValida = await bcrypt.compare(loginDto.password, user.password);

    if (!passwordValida) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const { password: _password, ...usuarioSinPassword } = user;
    return usuarioSinPassword;
  }
}
