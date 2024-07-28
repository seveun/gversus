import { Op } from '@sequelize/core';
import * as GameRepository from '@/repositories/Game.repository';
import { GameResult } from '@/database';

export const getById = async (id: string) => {
  const game = await GameRepository.getById(id);
  return game;
};

export const liveGames = async () => {
  const games = await GameResult.findAll({
    where: {
      payout: {
        [Op.gt]: 0,
      },
    },
    limit: 7,
    order: [['createdAt', 'DESC']],
  });
  return games;
};

export const liveGamesById = async (id: string) => {
  const game = await GameResult.findByPk(id);
  return game;
};
