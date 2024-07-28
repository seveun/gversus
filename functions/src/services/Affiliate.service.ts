/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
import { v4 as uuidv4 } from 'uuid';
import { literal, Op } from '@sequelize/core';
import { Transaction, User, Affiliate } from '@/database';
import { AffiliateFilters, AffiliateFiltersSchema } from '@/schemas/Affiliate.schema';

const rate = 0.10;

const getReferralsByUserId = async (userId: string, page: number) => {
  const offset = page * 100;
  const referrals = await User.findAll({
    where: { referrerId: userId },
    attributes: ['id'],
    limit: 100,
    offset,
  });
  return referrals;
};

const getTotalSpend = async (userId: string, referralIds: string[]) => {
  let totalDeposits = 0;
  let totalLosses = 0;

  for (let i = 0; i < referralIds.length; i += 100) {
    const chunk = referralIds.slice(i, i + 100);
    const deposits = await Transaction.sum(
      'amountEur',
      { where: { userId: chunk, type: 'deposit' } },
    );
    const losses = await Transaction.sum(
      'amountEur',
      { where: { userId: chunk, type: 'loss' } },
    ) * -1;

    totalDeposits += deposits;
    totalLosses += losses;
  }

  const eligibleAmount = Math.min(totalDeposits, totalLosses);
  return eligibleAmount;
};

const getTotalWithdraw = async (userId: string) => {
  const earning = await Affiliate.sum('earning', {
    where: {
      userId,
      status: {
        [Op.not]: 'REJECTED',

      },
    },
  });
  const amount = await Affiliate.sum('amount', {
    where: {
      userId,
      status: {
        [Op.not]: 'REJECTED',
      },
    },
  });
  return { earning, amount };
};

export const getStats = async (userId: string) => {
  let referrals = [] as User[];
  let page = 0;
  let currentReferrals;

  do {
    currentReferrals = await getReferralsByUserId(userId, page);
    referrals = referrals.concat(currentReferrals);
    page += 1;
  } while (currentReferrals.length === 100);

  const totalSpend = await getTotalSpend(userId, referrals.map((referral) => referral.id));
  const { earning, amount } = await getTotalWithdraw(userId);
  const availableAmount = (totalSpend - amount);
  const availableEarning = availableAmount * rate;
  const totalEarning = earning + availableEarning;
  const totalReferrals = referrals.length;

  return {
    totalSpend, availableAmount, totalEarning, totalReferrals, availableEarning,
  };
};

export const withdraw = async (userId: string) => {
  const { availableAmount, availableEarning } = await getStats(userId);
  const affiliate = await Affiliate.findOrCreate({
    where: { userId, status: 'WAITING_APPROVAL', commission: rate * 100 },
    defaults: {
      userId,
      status: 'WAITING_APPROVAL',
      amount: availableAmount,
      earning: availableEarning,
      commission: rate * 100,
      id: uuidv4(),
      createdAt: new Date(),
    },
  });
  if (!affiliate[1]) {
    await affiliate[0].update({
      amount: availableAmount + affiliate[0].amount,
      earning: availableEarning + affiliate[0].earning,
    });
  }
};

export const getWithdraws = async (userId: string, filters: AffiliateFilters) => {
  const { orderBy, order, page } = AffiliateFiltersSchema.parse(filters);
  const withdraws = await Affiliate.findAndCountAll({
    where: { userId },
    order: [[orderBy, order]],
    offset: (page - 1) * 8,
  });
  return withdraws;
};

export const getReferrersStats = async (userId: string, filters: AffiliateFilters) => {
  const { orderBy, order, page } = AffiliateFiltersSchema.parse(filters);
  const referrersStats = await User.findAndCountAll({
    attributes: [
      'id',
      'username',
      'createdAt',
      'referrerId',
      [literal(`(
        SELECT SUM(CASE WHEN "transactions"."type" = 'deposit' THEN "transactions"."amount_eur" ELSE 0 END)
        FROM "transactions"
        WHERE "transactions"."user_id" = "User"."id"
      )`), 'totalDeposits'],
      [literal(`(
        SELECT SUM(CASE WHEN "transactions"."type" = 'loss' THEN "transactions"."amount_eur" ELSE 0 END)
        FROM "transactions"
        WHERE "transactions"."user_id" = "User"."id"
      )`), 'totalLosses'],
      [literal(`(
        SELECT MAX(CASE WHEN "transactions"."type" = 'deposit' THEN "transactions"."created_at" ELSE NULL END)
        FROM "transactions"
        WHERE "transactions"."user_id" = "User"."id"
      )`), 'lastDepositDate'],
    ],
    where: {
      referrerId: userId,
    },
    order: [[orderBy, order]],
    offset: (page - 1) * 8,
    limit: 8,
  });

  return {
    rows: referrersStats.rows.map((r) => ({
      username: r.username,
      dateCreated: r.createdAt,
      totalDeposits: r.get('totalDeposits') as number,
      totalLosses: r.get('totalLosses') as number * -1,
      lastDepositDate: r.get('lastDepositDate') as Date,
      comission: Math.min(
  r.get('totalDeposits') as number,
      r.get('totalLosses') as number * -1,
      ) * rate,
    })),
    count: referrersStats.count,
  };
};
