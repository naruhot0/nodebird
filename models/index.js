const Sequelize = require('sequelize');
const env = process.env.Node_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.user = User;
db.post = Post;
db.Hashtag = Hashtag;

User.init(Sequelize);
Post.init(Sequelize);
Hashtag.init(Sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;