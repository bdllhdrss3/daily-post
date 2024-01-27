import { Table, Column, Model, Unique, Default } from 'sequelize-typescript';

const validGenders = ['MALE', 'FEMALE'];

@Table
export class User extends Model {
  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column({
    validate: {
      isIn: {
        args: [validGenders],
        msg: 'Gender must be either "MALE" or "FEMALE"',
      },
    },
  })
  @Default('MALE')
  @Column // Set a default value if needed
  gender: string;
}
