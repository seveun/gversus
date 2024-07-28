import {
  Attribute, PrimaryKey, NotNull, Default, BelongsTo,
} from '@sequelize/core/decorators-legacy';
import { DataTypes, Model, InferAttributes } from '@sequelize/core';
// eslint-disable-next-line no-use-before-define
export class User extends Model<InferAttributes<User>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @NotNull
  declare id: string;

  @Attribute(DataTypes.STRING)
  declare email: string | null;

  @Attribute(DataTypes.STRING)
  declare tempEmail: string | null;

  @Attribute(DataTypes.STRING)
  declare username: string | null;

  @Attribute(DataTypes.UUID)
  declare image: string | null;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare emailVerified?: boolean;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare phoneVerified?: boolean;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare twoFaVerified?: boolean;

  @Attribute(DataTypes.STRING)
  declare status: 'active' | 'ban' | 'disabled';

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  declare playCount?: number;

  @Attribute(DataTypes.STRING)
  declare firebaseId: string;

  @Attribute(DataTypes.STRING)
  declare phoneNumber: string | null;

  @Attribute(DataTypes.STRING)
  declare referralCode?: string | null;

  @Attribute(DataTypes.UUID)
  declare referrerId: string | null;

  @BelongsTo(() => User, {
    foreignKey: 'referrerId',
  })
  // eslint-disable-next-line no-use-before-define
  declare referrer: User | null;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  declare level?: number;

  @Attribute(DataTypes.FLOAT)
  @Default(0)
  declare xp?: number;

  @Attribute(DataTypes.UUID)
  declare cover: string | null;

  @Attribute(DataTypes.STRING)
  declare firstName: string | null;

  @Attribute(DataTypes.STRING)
  declare lastName: string | null;

  @Attribute(DataTypes.STRING)
  declare provider: string;

  @Attribute(DataTypes.STRING)
  declare twoFactor: 'app' | 'email' | 'sms' | null;

  @Attribute(DataTypes.STRING)
  declare affiliateCode?: string | null;

  @Attribute(DataTypes.STRING)
  declare appSecret: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare isBot: boolean;

  declare valid: boolean;

  declare createdAt: Date;
}
