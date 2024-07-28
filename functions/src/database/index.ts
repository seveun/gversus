import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { Transaction } from './models/Transaction.model';
import { User } from './models/User.model';
import { GamesUsers } from './models/GamesUsers.model';
import { AuthCode } from './models/AuthCode.model';
import { Session } from './models/Session.model';
import { Game } from './models/Game.model';
import { Exchange } from './models/Exchange.model';
import { Affiliate } from './models/Affiliate.model';
import { GameResult } from './models/GameResult.model';
import { setupMirrorAssociations } from './association';
import { Template } from './models/Template.model';
// import { sync } from './migrate';

let sequelize: Sequelize;

export const init = async () => {
  sequelize = await new Sequelize({
    dialect: PostgresDialect,
    url: process.env.DATABASE_URL,
    ssl: {
      ca: process.env.DATABASE_CA,
    },
    define: {
      underscored: true,
    },
    models: [GamesUsers, Template, User, Affiliate, AuthCode, Session, Exchange,
      Transaction, Game, GameResult],
  });
  await setupMirrorAssociations();
  await sequelize.authenticate();
  // await sync(sequelize);
  console.log('Database initialized');
};

export {
  User,
  AuthCode,
  Affiliate,
  Transaction,
  Session,
  Game,
  GamesUsers,
  GameResult,
  sequelize,
  Template,
};
