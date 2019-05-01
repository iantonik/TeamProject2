module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        schedule_date: {
            type: DataTypes.DATE
        },
        executed_Date: {
            type: DataTypes.DATE
        }
    });

    Session.associate = function (models) {
        Session.belongsTo(models.Package,{
            foreignKey:{
                allowNull: false
            },
            onDelete: 'CASCADE'
        })
        Session.belongsTo(models.Client,{
            foreignKey:{
                allowNull: false
            },
            onDelete: 'CASCADE' 
        })
    }

    // Session.associate = function (models) {
    //     Session.hasOne(models.Package, {
    //         foreignKey: {
    //             //Bug: allowNull is not set to false when table is created.
    //             allowNull: false
    //         },
    //     })
    //     Session.hasOne(models.Client, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     })
    // };
    
    return Session;
};

