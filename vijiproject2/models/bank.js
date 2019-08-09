module.exports = function(sequelize,DataTypes){
    var Bank = sequelize.define("Bank",{

        bank_UserName : {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_Password :{
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_code :{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount_Availablity :{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Bank;
}