'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let characters=[
      {idCharacter:1,name:"ROBIN WILLIAMS",imageCharacter:"ROBIN_WILLIAMS.JPG",age:60, weight:80, history:"ACTOR Y COMEDIANTE ESTADOUNIDENSE"},
      {idCharacter:2,name:"DWAYNE JHONSON",imageCharacter:"DWAYNE_JHONSON.JPG",age:52, weight:110, history:"ACTOR Y LUCHADOR PROFESIONAL CONOCIDO COMO LA ROCA"},
      {idCharacter:3,name:"ANGELINA JOLIE",imageCharacter:"ANGELINA_JOLIE.JPG",age:45, weight:55, history:"ACTRIZ, GUIONISTA Y PRODUCTORA ESTADOUNIDENSE"},
      {idCharacter:4,name:"JACOB BERTRAND",imageCharacter:"JACOB_BERTRAND.PNG",age:25, weight:75, history:"ACTOR ESTADOUNIDENSE, CONOCIDO POR SU PAPEL EL COBRA KAI"},
      {idCharacter:5,name:"PERSONAJES ANIMADOS",imageCharacter:"DIBUJOSANIMADOS.JPG", history:"PERSONAJES ANIMADOS"},
      {idCharacter:7,name:"CORBIL BLEU",imageCharacter:"CORBIN_BLEU.JPG", history:"ACTOR Y BAILARIN"},
      {idCharacter:8,name:"PEYTON ROI",imageCharacter:"PEITON_ROI.JPG", history:"ACTRIZ NORTEAMERICANA"}
    ]    
    await queryInterface.bulkInsert('Characters',characters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};
