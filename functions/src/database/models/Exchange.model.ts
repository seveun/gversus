import { Attribute, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes } from '@sequelize/core';

// eslint-disable-next-line no-use-before-define
export class Exchange extends Model<InferAttributes<Exchange>> {
      @Attribute(DataTypes.STRING)
      @PrimaryKey
      @NotNull
  declare to: string;

      @Attribute(DataTypes.STRING)
      declare from: string;

      @Attribute(DataTypes.FLOAT)
      declare rate: number;
}
