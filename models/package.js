module.exports = function (sequelize, DataTypes) {
    var Package = sequelize.define("Package", {
        session_count: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.FLOAT
        },
        workout_type: {
            type: DataTypes.STRING
        },
        inactive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    Package.associate = function (models) {
        Package.hasOne(models.Client);
        Package.hasOne(models.Session);
    };


    return Package;
};