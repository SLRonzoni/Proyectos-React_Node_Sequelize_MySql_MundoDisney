'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let characterMovies=[
      {moviesId:1,charactersId:1},
      {moviesId:2,charactersId:2},
      {moviesId:3,charactersId:5},
      {moviesId:4,charactersId:3},
      {moviesId:4,charactersId:4},
      {moviesId:5,charactersId:1},
      {moviesId:6,charactersId:5},
      {moviesId:7,charactersId:5}
      
    ]    
    await queryInterface.bulkInsert('CharacterMovies',characterMovies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CharacterMovies', null, {});
  }
};
