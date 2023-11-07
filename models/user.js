const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(Sequelize){
        return super.init({
            email: {
                type: Sequelize.String(40),
                allowNull: true,
                unique: true
            },
            nick: {
                type: Sequelize.String(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.String(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.String(10),
                allowNull: false,
                defaultValue:'local',
            },
            snsId: {
                type: Sequelize.String(30),
                allowNull: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });

    }
};