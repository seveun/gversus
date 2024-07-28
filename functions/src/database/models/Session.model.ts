import {
  Attribute, PrimaryKey, NotNull, BelongsTo,
} from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes } from '@sequelize/core';
import { User } from './User.model';

// eslint-disable-next-line no-use-before-define
export class Session extends Model<InferAttributes<Session>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @NotNull
  declare id: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare authTime: number;

    @Attribute(DataTypes.STRING)
    declare ip: string | null;

    @Attribute(DataTypes.STRING)
    declare ipLocation: string | null;

    @Attribute(DataTypes.STRING)
    declare userAgent: string | null;

    @Attribute(DataTypes.STRING)
    declare userAgentParsed: string | null;

    @Attribute(DataTypes.BOOLEAN)
    declare twoFactor: boolean;

    declare userId: string;

    @BelongsTo(() => User, 'userId')
    declare user?: User;

    @Attribute(DataTypes.STRING)
    declare status: string;

    @Attribute(DataTypes.DATE)
    declare updatedAt?: Date;
}
