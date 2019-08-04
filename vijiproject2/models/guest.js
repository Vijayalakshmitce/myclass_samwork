module.exports = function(sequelize,DataTypes){
    var Guest = sequelize.define("Guest",{
        guest_Name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shelter_Name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        entry_Date:{
            type: DataTypes.DATE,
            allowNull: false
        }

    });
      return Guest;
}