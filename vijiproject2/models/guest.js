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
        shelter_id:{
            type: DataTypes.INTEGER,
        },
        shelter_Name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        entry_Date:{
            type: DataTypes.DATE,
            allowNull: false
        },
            guest_Flag:{
                type: DataTypes.BOOLEAN,
                defaultValues : false
            }
        

    });
    Guest.associate = function(models){
        Guest.belongsTo(models.Shelter,{
        onDelete: "CASCADE",
                foreignKey:"shelter_id"
        })
        
        }
   
    
      return Guest;
}