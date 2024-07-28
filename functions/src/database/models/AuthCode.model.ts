import {
  Attribute, PrimaryKey, NotNull, BelongsTo,
} from '@sequelize/core/decorators-legacy';
import {
  DataTypes, Model, InferAttributes, NonAttribute,
} from '@sequelize/core';
import { User } from './User.model';

// eslint-disable-next-line no-use-before-define
export class AuthCode extends Model<InferAttributes<AuthCode>> {
        @Attribute(DataTypes.UUID)
        @PrimaryKey
        @NotNull
  declare id: string;

        @Attribute(DataTypes.STRING)
        declare receiver: string;

        @Attribute(DataTypes.INTEGER)
        declare code: number | null;

        @Attribute(DataTypes.STRING)
        declare type: string;

        declare userId: string;

        @BelongsTo(() => User, {
          foreignKey: 'userId',
          targetKey: 'id',
        })
        declare user?: NonAttribute<User>;

        @Attribute(DataTypes.DATE)
        declare createdAt: Date;
}
