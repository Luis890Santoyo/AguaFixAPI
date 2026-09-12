import { getRepositoryToken } from '@nestjs/typeorm';

export function mockRepository() {
  return {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
}

export function provideMockRepository(entity: new (...args: any[]) => unknown) {
  return {
    provide: getRepositoryToken(entity),
    useValue: mockRepository(),
  };
}
