import {
  Attribute, PrimaryKey, NotNull, BelongsTo, AllowNull, BeforeCreate,
} from '@sequelize/core/decorators-legacy';
import {
  DataTypes, Model, InferAttributes, QueryTypes,
} from '@sequelize/core';
import { User } from './User.model';
import { Game } from './Game.model';

// eslint-disable-next-line no-use-before-define
export class Transaction extends Model<InferAttributes<Transaction>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
    @NotNull
  declare id: string;

    @Attribute(DataTypes.STRING)
    declare type: 'deposit' | 'sold' | 'loss' | 'item' | 'ordered' | 'canceled' | 'withdrawal';

    @Attribute(DataTypes.FLOAT)
    declare amount: number;

    @Attribute(DataTypes.FLOAT)
    declare amountEur: number;

    @Attribute(DataTypes.STRING)
    declare wallet: string;

    @Attribute(DataTypes.INTEGER)
    declare level: number | null;

    @BelongsTo(() => User, 'userId')
    declare user?: User;

    declare gameId?: string;

    @Attribute(DataTypes.STRING)
    @AllowNull
    declare status?: 'WAITING_APPROVAL' | 'SHIPPING' | 'DELIVERED' | 'CANCELED';

    @BelongsTo(() => Game, 'gameId')
    declare game?: Game;

    declare userId: string;

    @Attribute(DataTypes.DATE)
    declare createdAt?: Date;

    @Attribute(DataTypes.DATE)
    declare updatedAt?: Date;

    @Attribute(DataTypes.STRING)
    @AllowNull
    declare gameType?: string;

    @Attribute(DataTypes.INTEGER)
    @AllowNull
    declare customId?: number;

    @BeforeCreate
    static async assignItemNumber(transaction: Transaction) {
      const result = await transaction.sequelize.query<{ custom_id: number }>(
        "SELECT nextval('custom_id_sequence') as custom_id",
        { type: QueryTypes.SELECT },
      );
      const itemNumber = result[0]?.custom_id;
      if (itemNumber) {
        transaction.setDataValue('customId', itemNumber);
      }
    }
}
