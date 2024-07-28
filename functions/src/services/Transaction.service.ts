import { v4 as uuidv4 } from 'uuid';
import { Transaction, Game } from '@/database';
import * as ExchangeService from '@/services/Exchange.service';
import * as RefreshService from '@/services/Refresh.service';
import { TransactionFiltersSchema, TransactionFilters } from '@/schemas/Transaction.schema';

export const getLossByGameId = async (gameId: string, userId: string) => Transaction.findOne({
  where: {
    gameId,
    userId,
    type: 'loss',
  },
});

export const loss = async (userId: string, wallet: string, game: Game) => {
  await Transaction.create({
    id: uuidv4(),
    type: 'loss',
    amountEur: game.price * -1,
    amount: (await ExchangeService.convert(game.price, wallet)) * -1,
    wallet,
    userId,
    gameId: game.id,
    gameType: game.type,
  });
  await RefreshService.byEntitiy('transactions', userId);
};

export const getByUserId = async (userId: string, transactionFilters: TransactionFilters) => {
  const {
    type, orderBy, order, page, itemsByPage,
  } = TransactionFiltersSchema.parse(transactionFilters);
  const items = await Transaction.findAndCountAll({
    where: { userId, ...(type && { type }) },
    order: [[orderBy, order]],
    limit: itemsByPage,
    offset: (page - 1) * itemsByPage,
  });
  return {
    rows: items.rows,
    count: items.count,
  };
};

export const deleteAllByGameAndUser = async (gameId: string, userId: string) => {
  await Transaction.destroy({ where: { gameId, userId } });
};

export const deleteAllByGame = async (gameId: string) => {
  await Transaction.destroy({ where: { gameId } });
};
