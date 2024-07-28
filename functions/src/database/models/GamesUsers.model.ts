import { Attribute, PrimaryKey } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes } from '@sequelize/core';

// eslint-disable-next-line no-use-before-define
export class GamesUsers extends Model<InferAttributes<GamesUsers>> {
  @PrimaryKey
  @Attribute(DataTypes.UUID)
  declare gameId: string;

  @Attribute(DataTypes.UUID)
  declare userId: string;

  @PrimaryKey
  @Attribute(DataTypes.INTEGER)
  declare position: number;
}
