import { Game, User } from '@/database';

export const getById = async (id: string) => {
  const game = await Game.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'image', 'username', 'level', 'isBot'],
      },
    ],
    attributes: {
      exclude: ['secrets'],
    },
  });
  return game;
};
