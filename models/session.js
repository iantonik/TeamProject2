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
        Session.belongsTo(models.Purchase,{
            foreignKey:{
                allowNull: false
            },
            onDelete: 'CASCADE',
            hooks: true
        })
        Session.belongsTo(models.Client,{
            foreignKey:{
                allowNull: false
            },
            onDelete: 'CASCADE',
            hooks: true
        })
    }


    
    return Session;
};