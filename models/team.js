module.exports = function(sequelize, DataTypes){
    var Team = sequelize.define("Team", {
        TeamMember: DataTypes.STRING
    });
    return Team;
}