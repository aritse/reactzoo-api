module.exports = function(sequelize, DataTypes) {
  const Animal = sequelize.define("Animal", {
    species: DataTypes.STRING,
    class: DataTypes.STRING,
    eatsMeat: DataTypes.BOOLEAN,
    weight: DataTypes.INTEGER
  });

  return Animal;
};
