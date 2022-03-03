const Movies = require('./Movies');
const Characters = require('./Characters');
const Genders = require('./Genders');

//relacion entre Gender y Movies, uno a muchos
Genders.hasMany(Movies,{foreignKey:"genderMovie"});
Movies.belongsTo(Genders,{foreignKey:"genderMovie"});

//relacion entre Characters y Movies, Muchos a muchos
Movies.belongsToMany(Characters,{through:"CharacterMovies",foreignKey:"moviesId",target_key:"charactersId"});
Characters.belongsToMany(Movies,{through:"CharacterMovies",foreignKey:"charactersId",target_key:"moviesId"});

