module.exports = (sequelize, DataTypes) => {
  let city = sequelize.define('city', {
    city_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tile_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    city_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    city_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  city.associate = function (models) {
    models.city.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
    models.city.belongsTo(models.tile, {
      foreignKey: 'tile_id'
    });
  };

  return city;
};