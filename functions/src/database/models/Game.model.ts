import {
  Attribute, PrimaryKey, NotNull, BelongsTo, BelongsToMany,
} from '@sequelize/core/decorators-legacy';
import {
  DataTypes, Model, InferAttributes, HasManyAddAssociationsMixin,
} from '@sequelize/core';
import { User } from './User.model';
import { GamesUsers } from './GamesUsers.model';

// eslint-disable-next-line no-use-before-define
export class Game extends Model<InferAttributes<Game>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @NotNull
  declare id: string;

  @Attribute(DataTypes.STRING)
  declare status: 'started' | 'finished' | 'canceled' | 'pending' | 'pre-started' | 'equality';

  @Attribute(DataTypes.JSON)
  declare data: {
    results?: {
      serverSeed: string;
      clientSeed: string;
      spin: number;
      userId: string;
    }[];
    winners?: string[];
    usersEquality?: string[];
    equalityWinner?: string
  };

  @Attribute(DataTypes.JSON)
  declare secrets?: {
    password?: string | null;
  };

  @Attribute(DataTypes.BOOLEAN)
  declare isPrivate: boolean;

  @Attribute(DataTypes.INTEGER)
  declare maxPlayers: number;

  @Attribute(DataTypes.FLOAT)
  declare price: number;

  @Attribute(DataTypes.INTEGER)
  declare stepNumber: number | null;

  @Attribute(DataTypes.STRING)
  declare type?: 'battle-blackjack';

  declare creatorId: string;

  @BelongsTo(() => User, 'creatorId')
  declare creator?: User;

  @BelongsToMany(() => User, {
    through: () => GamesUsers,
    foreignKey: 'gameId',
    otherKey: 'userId',
  })
  declare users?: (User & {GamesUsers: GamesUsers})[];

  declare addUsers: HasManyAddAssociationsMixin<User, number>;

  declare createdAt?: Date;

  declare updatedAt?: Date;
}
