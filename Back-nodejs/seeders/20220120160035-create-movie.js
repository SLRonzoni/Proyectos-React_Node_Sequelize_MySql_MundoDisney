'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let movies=[
      {idMovie:1,title:"JUMANJI ORIGINAL",image:"JUMANJI_ORIGINAL.JPG",created:"1995-12-12",qualification: 1,genderMovie:1},
      {idMovie:2,title:"JUMANJI REMAKE",image:"JUMANJI_REMAKE.JPG",created:"2007-04-06",qualification: 1,genderMovie:1},
      {idMovie:3,title:"HOTEL TRANSYLVANIA",image:"HOTEL_TRANSYLVANIA.JPG",created:"2015-11-05",qualification:2 ,genderMovie:5},
      {idMovie:4,title:"MALEFICA",image:"MALEFICA.PNG",created:"2018-09-08",qualification: 3,genderMovie:2},
      {idMovie:5,title:"SALTA",image:"SALTA.JPG",created:"2000-11-12",qualification:4 ,genderMovie:1},
      {idMovie:6,title:"BAMBI",image:"BAMBI.JPG",created:"1965-06-06",qualification:2 ,genderMovie:5},
      {idMovie:7,title:"LA CENICIENTA",image:"LA_CENICIENTA.JPG",created:"1950-08-23",qualification: 3,genderMovie:5},
    ]    
    await queryInterface.bulkInsert('Movies',movies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
