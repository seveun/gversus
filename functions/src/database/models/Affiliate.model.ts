import {
  Attribute, PrimaryKey, NotNull, BelongsTo,
} from '@sequelize/core/decorators-legacy';
import {
  DataTypes, Model, InferAttributes, NonAttribute,
} from '@sequelize/core';
import { User } from './User.model';

// eslint-disable-next-line no-use-before-define
export class Affiliate extends Model<InferAttributes<Affiliate>> {
          @Attribute(DataTypes.UUID)
          @PrimaryKey
          @NotNull
  declare id: string;

          @Attribute(DataTypes.STRING)
          declare status: string;

          @Attribute(DataTypes.FLOAT)
          declare amount: number;

          @Attribute(DataTypes.FLOAT)
          declare commission: number;

          @Attribute(DataTypes.FLOAT)
          declare earning: number;

          @BelongsTo(() => User, {
            foreignKey: 'userId',
            targetKey: 'id',
          })
          declare user?: NonAttribute<User>;

          declare userId: string;

          @Attribute(DataTypes.DATE)
          declare createdAt: Date;
}
