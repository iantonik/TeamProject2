module.exports = function(sequelize, DataTypes) {
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
        is_active: {
            type: DataTypes.BOOLEAN
        },
        age: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.INTEGER
        }
    });

    Client.associate = function(models) {
        Client.hasMany(models.Package, {
            onDelete: "cascade"
        });
    };

    return Client;
}