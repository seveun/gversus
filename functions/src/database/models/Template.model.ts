import {
  Attribute, PrimaryKey, NotNull,
} from '@sequelize/core/decorators-legacy';
import {
  DataTypes, Model, InferAttributes,
} from '@sequelize/core';

// eslint-disable-next-line no-use-before-define
export class Template extends Model<InferAttributes<Template>> {
    @Attribute(DataTypes.UUID)
    @PrimaryKey
  declare id: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare type: 'VERIF_MAIL' | 'TWO_FACTOR_AUTH_MAIL' | 'FORGOT_PASSWORD' |
    'VERIF_SMS' | 'TWO_FACTOR_AUTH_SMS';

    @Attribute(DataTypes.STRING(9000))
    declare template: string;

    @Attribute(DataTypes.STRING(9000))
    declare subject: string;

    @NotNull
    @Attribute(DataTypes.STRING)
    declare language: string;

    @Attribute(DataTypes.STRING)
    declare variables: string;
}
