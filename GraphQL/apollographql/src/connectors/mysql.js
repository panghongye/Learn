import Sequelize, { DataTypes } from 'sequelize'

export const connectmysql = async () => {
  const db = new Sequelize('oneclass', 'root', 'root', {
    dialect: 'mysql',
    operatorsAliases: false,
    host: 'localhost',
    port: 3306,
  })

  // models
  const MakerModel = db.define('maker', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  })

  const PizzaModel = db.define('pizza', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    handle: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    views: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
  })

  const ToppingModel = db.define('topping', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
  })

  // associations (creates foreign keys and join tables)
  MakerModel.hasMany(PizzaModel)
  ToppingModel.belongsToMany(PizzaModel, { through: 'pizzatoppings' })

  db.sync({ force: false })

  const { maker: Maker, pizza: Pizza, topping: Topping } = db.models
  return { Maker, Pizza, Topping }
}
