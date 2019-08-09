module.exports = function(sequelize,DataTypes){
    var donation = sequelize.define("donation",{
        shelter_Id :{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shelter_Name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        donation_Done :{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return donation;
}