module.exports = function (sequelize, DataTypes) {

    //id
    //packageName
    //packagePrice
    //sessionCount
    //ClientId

    var Purchase = sequelize.define("Purchase", {
        workout_type: {
            type: DataTypes.STRING
        },
        session_count: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.FLOAT
        },
    });

    Purchase.associate = function (models) {
        Purchase.belongsTo(models.Client,{
            foreignKey:{
                allowNull: false,
            },
            onDelete: 'CASCADE',
            hooks: true
        })

        Purchase.hasMany(models.Session, {
            foreignKey:{
                allowNull: false
            },
            onDelete: 'CASCADE',
            hooks: true
        })
    };


    return Purchase;
};