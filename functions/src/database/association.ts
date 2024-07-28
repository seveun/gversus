import { User } from './models/User.model';
import { Transaction } from './models/Transaction.model';

export const setupMirrorAssociations = () => {
  User.hasMany(Transaction, {
    foreignKey: 'userId',
    as: 'transactions',
  });
};
