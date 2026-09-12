import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: {
    create: jest.Mock<Promise<User>, [Partial<User>]>;
    findByEmail: jest.Mock<Promise<User | null>, [string]>;
  };

  beforeEach(async () => {
    usersService = {
      create: jest.fn<Promise<User>, [Partial<User>]>(),
      findByEmail: jest.fn<Promise<User | null>, [string]>(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: usersService }],
    }).compile();

    authService = module.get(AuthService);
  });

  describe('register', () => {
    it('debe guardar el usuario con la contraseña hasheada y no devolverla', async () => {
      usersService.create.mockImplementation((data) =>
        Promise.resolve({
          id: 1,
          name: data.name ?? '',
          email: data.email ?? '',
          password: data.password ?? '',
          isNotificationEnabled: data.isNotificationEnabled ?? true,
        }),
      );

      const resultado = await authService.register({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'clave123',
      });

      expect(usersService.create).toHaveBeenCalledTimes(1);
      const datosGuardados = usersService.create.mock.calls[0][0];
      expect(datosGuardados.password).not.toBe('clave123');
      expect(await bcrypt.compare('clave123', datosGuardados.password ?? '')).toBe(true);
      expect(resultado).not.toHaveProperty('password');
    });
  });

  describe('login', () => {
    it('lanza BadRequestException si el usuario no existe', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'no-existe@example.com', password: 'clave123' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('lanza BadRequestException si la contraseña es incorrecta', async () => {
      const passwordHasheada = await bcrypt.hash('claveCorrecta', 10);
      usersService.findByEmail.mockResolvedValue({
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: passwordHasheada,
        isNotificationEnabled: true,
      });

      await expect(
        authService.login({ email: 'juan@example.com', password: 'claveIncorrecta' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('devuelve el usuario sin la contraseña si las credenciales son correctas', async () => {
      const passwordHasheada = await bcrypt.hash('clave123', 10);
      usersService.findByEmail.mockResolvedValue({
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: passwordHasheada,
        isNotificationEnabled: true,
      });

      const resultado = await authService.login({
        email: 'juan@example.com',
        password: 'clave123',
      });

      expect(resultado).not.toHaveProperty('password');
      expect(resultado.email).toBe('juan@example.com');
    });
  });
});
