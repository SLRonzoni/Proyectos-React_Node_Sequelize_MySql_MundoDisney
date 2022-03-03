'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let genders=[
      {idGender:1,name:"AVENTURAS",image:"AVENTURAS.JPG"},
      {idGender:2,name:"FANTASIA",image:"FANTASIA.JPG"},
      {idGender:3,name:"DIBUJOS ANIMADOS",image:"DIBUJOSANIMADOS.JPG"},
      {idGender:4,name:"PRINCESAS",image:"PRINCESAS.JPG"},
      {idGender:5,name:"VILLANOS",image:"VILLANOS.JPG"},
    ]    
    await queryInterface.bulkInsert('Genders',genders, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genders', null, {});
  }
};
