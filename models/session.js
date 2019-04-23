module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        is_scheduled: {
            type: DataTypes.BOOLEAN
        },
        is_used: {
            type: DataTypes.BOOLEAN
        },
        schedule_date: {
            type: DataTypes.DATE
        }
    });

    Session.associate = function(models) {
        Session.belongsTo(models.Package, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Session;    

};

