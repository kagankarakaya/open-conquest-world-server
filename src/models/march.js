module.exports = (sequelize, DataTypes) => {
  let march = sequelize.define('march', {
    march_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    army_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true
    },
    start_tile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    end_tile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  march.associate = function (models) {
    models.march.belongsTo(models.army, {
      foreignKey: 'army_id'
    });
    models.march.belongsTo(models.tile, {
      foreignKey: 'start_tile_id'
    });
    models.march.belongsTo(models.army, {
      foreignKey: 'end_tile_id'
    });
  };

  return march;
};