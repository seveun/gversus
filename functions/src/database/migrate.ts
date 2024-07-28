import { DataTypes } from '@sequelize/core';

export const up = async (sequelize: any) => {
  const queryInterface = sequelize.getQueryInterface();

  // Créer la séquence item_sequence si elle n'existe pas déjà
  const sequenceExists = await queryInterface.sequelize.query(
    `SELECT EXISTS (
      SELECT 1
      FROM pg_sequences
      WHERE schemaname = 'public'
      AND sequencename = 'custom_id_sequence'
    )`,
  );

  if (!sequenceExists[0][0].exists) {
    await queryInterface.sequelize.query(`
      CREATE SEQUENCE custom_id_sequence
      START WITH 19280891
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
    `);
  }

  // Vérifier si la table transactions existe
  const tableExists = await queryInterface.sequelize.query(
    `SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = 'transactions'
    )`,
  );

  // Si la table transactions existe, vérifier si la colonne item_number existe
  if (tableExists[0][0].exists) {
    const columnExists = await queryInterface.sequelize.query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name='transactions' AND column_name='custom_id'`,
    );

    // Si la colonne item_number n'existe pas, l'ajouter
    if (columnExists[0].length === 0) {
      await queryInterface.addColumn('transactions', 'custom_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      });
    }
  }
};

export const sync = async (sequelize: any) => {
  await up(sequelize);
  await sequelize.sync({ alter: true });
  await up(sequelize);
};
