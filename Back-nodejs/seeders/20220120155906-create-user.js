'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users=[
      {name:"MARTIN", lastname:"KARADAGIAN",email:"SLRONZONI@YAHOO.COM",clave:"$2b$10$WIQRuASfe/uD1ZP67drkTOwdbGlHK1/sA2j/EmHzzcAZwfkLvDqXK",role:"ADMIN"},
      {name:"DIANA", lastname:"PRINCE",email:"QUJESCELU@GMAIL.COM",clave:"$2b$10$dE9pZGqS4Qn3F1yZWqnCSOKax5lTtltgM0t.5adHpiOlMoFbtPeua",role:"USER"},
      {name:"CAPITAN", lastname:"ESCARLATA",email:"CAPI@GMAIL.COM",clave:"$2b$10$CBZ9oN5pJCp08sga6Iu6SeIlY/9.CjhZnOsCgcTqt9jvtLeklQNme",role:"USER"},
    ]
  
      await queryInterface.bulkInsert('Users',users,{});
     
   },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
