module.exports = function(sequelize, DataTypes) {
    var Package = sequelize.define("Package", {
        session_count: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.FLOAT
        },
        workout_type: {
            type: DataTypes.STRING
        }
    });
    


    Package.associate = function(models) {
        Package.belongsTo(models.Client, {
            foreignKey: {
                allowNull: false
            }
        });

        Package.hasMany(models.Session, {
            onDelete: "cascade"
        });
    };

    return Package;
};