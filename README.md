# Proyectos-React_Node_Sequelize_MySql_MundoDisney


Alkemy – Challenge Node JS                                                                                      

Estructura y contexto del proyecto
El escenario planteado en el trabajo comienza considerando un usuario que se registra y loguea.
Se ha realizado el FrontEnd de todo el proyecto con React JS, con validaciones, botones desplegables y mensajes al usuario (con sweetalert2).
En cuanto al BackEnd , se ha trabajado con Node JS y Sequelize.
Como base de datos se ha utilizado MySQL.
Se han desarrollado tests  con Mocha y Chai, y comprobaciones de funcionalidad con Postman.  
Además de los servicios solicitados en el proyecto para Movies y Characters,  implementación de base de datos de usuarios, registro y logueo;  el BackEnd  realiza los servicios relacionados a deslogueo de Users , altas, bajas y modificaciones de Genders.
Cada usuario tiene permisos relacionados a su clave personal, un token y para el acceso a las rutas de servicio además, se han implementado roles para Administrador y Usuario común, mostrando opciones diferentes para cada rol. Los usuarios comunes solo pueden consultar , mientras que el administrador además puede modificar, eliminar y dar de alta.
                               

  
Aclaraciones
Dado los enunciados del challenge, se ha tomado a los “Characters”, como actores y actrices.
En cuanto a los campos idMoviesAssoc ( tabla Characters ) y charactersAssoc ( tabla Movies ) , no se han utilizado en la base de datos, ya que la relación entre ambas tablas es de Muchos a Muchos, por lo que se generó una tabla intermedia adicional para manejar dicha relación.
El campo moviesAssoc ( tabla Genders ) tampoco se ha utilizado en la base de datos, ya que la relación con la tabla Movies, está dada como Muchos a Uno, por lo que la información de las películas por género, se podría obtener directamente desde la tabla Movies mediante el campo genderMovie.





