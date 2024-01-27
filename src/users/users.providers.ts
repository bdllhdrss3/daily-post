import { User } from './entities/user.entity';

export const UsersRepository = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
