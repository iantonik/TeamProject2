module.exports = function (sequelize, DataTypes) {
    var Client = sequelize.define("Client", {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.INTEGER
        }
    });

    Client.associate = function (models) {
        Client.belongsTo(models.Package);
        Client.hasMany(models.Session, {
            foreignKey:{
                allowNull: false
            },
            onDelete: 'CASCADE'
        });

    }

    return Client;
}

