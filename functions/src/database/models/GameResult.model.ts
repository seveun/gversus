import { Attribute, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes } from '@sequelize/core';

// eslint-disable-next-line no-use-before-define
export class GameResult extends Model<InferAttributes<GameResult>> {
      @Attribute(DataTypes.UUID)
      @PrimaryKey
      @NotNull
  declare id: string;

    @Attribute(DataTypes.STRING)
      declare gameType: string;

    @Attribute(DataTypes.STRING)
    declare username: string;

    @Attribute(DataTypes.FLOAT)
    declare duration: number;

    @Attribute(DataTypes.FLOAT)
    declare betAmount: number;

    @Attribute(DataTypes.FLOAT)
    declare multiplier: number;

    @Attribute(DataTypes.FLOAT)
    declare payout: number;
}
