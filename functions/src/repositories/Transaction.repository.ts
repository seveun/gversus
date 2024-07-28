import { Op, literal } from '@sequelize/core';
import { Transaction } from '@/database/models/Transaction.model';

export const getWalletsByUserId = async (userId: string) => {
  const wallets = (await Transaction.findAll({
    where: {
      userId,
      type: {
        [Op.in]: ['deposit', 'loss', 'sold'],
      },
    },
    attributes: [
      'wallet',
      [literal('CAST(SUM(amount) AS FLOAT)'), 'amount'],
    ],
    group: ['wallet', 'user_id'],
  })).map((w) => {
    if (w.wallet === 'EUR' || w.wallet === 'USD' || w.wallet === 'USDT') {
      return {
        wallet: w.wallet,
        amount: Math.ceil(w.amount * 10) / 10,
      };
    }
    return { wallet: w.wallet, amount: w.amount };
  });
  return wallets;
};
