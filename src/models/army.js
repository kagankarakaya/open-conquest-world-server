module.exports = (sequelize, DataTypes) => {
  let army = sequelize.define('army', {
    army_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  army.associate = function (models) {
    models.army.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
  };

  return army;
};