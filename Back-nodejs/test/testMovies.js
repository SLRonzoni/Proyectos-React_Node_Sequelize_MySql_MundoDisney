const chai=require('chai');
const chaiHttp=require('chai-http');
const expect=require('chai').expect;
require('dotenv').config();

chai.use(chaiHttp);

const url=process.env.CRED_URL;

const email=process.env.CRED_EMAIL;
const clave=process.env.CRED_CLAVE;
let user={};
     
    describe('Testing POST /auth/login', function(){
        it('mov, respond with token', function(done){
            data={
                "email":email,
                "clave":clave
            }
            chai.request(url)
            .post("/auth/login")
                .send(data)    
                .end(function(err,res){   
                    expect(res.body).to.be.an('object');
                    user=res.body;
                    done();
                });
        });
    });
    
    describe('Testing GET /movies', function(){
        it('respond with array all movies', function(done){
            chai.request(url)
                .get("/movies")
                .set("Authorization","Bearer "+ user.token)      
                .end(function(err,res){   
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('testing GET /movies/:id', function(){
        it('respond with single movie', function(done){
            chai.request(url)
                .get("/movies/1")
                .set("Authorization","Bearer "+ user.token) 
                .end(function(err,res){
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('when movie doesnt exists', function(done){
            chai.request(url)
                .get("/movies/300")
                .set("Authorization","Bearer "+ user.token) 
                .end(function(err,res){
                    
                    expect(res.body).includes({msg:"No se encuentra la película"});
                    done();
                });
        });

    });


    describe('testing POST /movies', function(){
        it('when movie exist', function(done){
           let data= {
            "title": "JUMANJI ORIGINAL",
            "image":"jumanji_original.jpg",
            "created": "1995-09-02",
            "genderMovie":1,
            "qualification":1
            }
            chai.request(url)
                .post("/movies")
                .set("Authorization","Bearer "+ user.token) 
                .send(data)                
                .end(function(err,res){                  
                    expect(res.body).includes({msg:'La pelicula que intenta ingresar, ya existe'});
                    expect(res.status).to.be.equal(400)
                    done();
                });
        });

        it('verify qualification', function(done){
            let data= {                 
                "title": "Probando",
                "image":"jumanji_original.jpg",
                "created": "1995-09-02",
                "genderMovie":1,
                "qualification":8,
                "charactersAssoc":1
             }
             chai.request(url)
                 .post("/movies")
                 .set("Authorization","Bearer "+ user.token) 
                 .send(data)                
                 .end(function(err,res){                        
                     expect(res.body).includes({msg:'Validation error: La calificacion debe estar entre 1 y 5'});
                     done();
                 });
         });

         
         it('verify date', function(done){
            let data= {                
                "title": "Probando",
                "image":"jumanji_original.jpg",
                
                "genderMovie":1,
                "qualification":1
             }
             chai.request(url)
                 .post("/movies")
                 .set("Authorization","Bearer "+ user.token) 
                 .send(data)                
                 .end(function(err,res){                                         
                    expect(res.status).to.be.equal(400);
                    done()
                 });
         });

    });

    describe('testing DELETE /movies', function(){
        it('when movie doesnt exists', function(done){
            chai.request(url)
                .delete("/movies/3000")
                .set("Authorization","Bearer "+ user.token) 
                .end(function(err,res){              
                    expect(res.body).includes({msg:'No se encuentra la pelicula'});
                    done();
                });
        });
    });

    describe('testing PUT /movies/edit/:id', function(){
        it('verify qualification', function(done){
            let data= {                   
                "title": "Probando",
                "image":"jumanji_original.jpg",
                "created": "1995-08-02",
                "genderMovie":1,
                "qualification":6,
                "charactersAssoc":1
            }
             chai.request(url)
                 .put("/movies/edit/1") 
                 .set("Authorization","Bearer "+ user.token) 
                 .send(data)                
                 .end(function(err,res){                         
                     expect(res.body).includes({msg:'Validation error: La calificacion debe estar entre 1 y 5'});
                     done();
                 });
         });
         
          it('verify created', function(done){
             let data= {
                  "title": "JUMANJI ORIGINAL",
                  "image":"jumanji_original.jpg",
                  "created": "16",
                  "genderMovie":1,
                  "qualification":1,
                  "charactersAssoc":1
              };
              chai.request(url)
                  .put("/movies/edit/1")
                  .set("Authorization","Bearer "+ user.token) 
                  .send(data)                
                  .end(function(err,res){                         
                    expect(res.body).includes({msg:'Validation error: formato de fecha incorrecto ( dd-mm-aaaa ),\nValidation error: fecha vacía o error de formato'});
                    done();
                  });
          });
    });