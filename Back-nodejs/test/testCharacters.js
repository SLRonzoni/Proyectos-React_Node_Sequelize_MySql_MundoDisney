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
    it('char, respond with token', function(done){
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

    describe('Testing GET /characters', function(){
        it('respond with array all characters', function(done){
            chai.request(url)
            .get("/characters")
                .set("Authorization","Bearer "+ user.token)     
                .end(function(err,res){   
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('testing GET /characters/:id', function(){
        it('respond with a single character', function(done){
            chai.request(url)
                .get("/characters/1") 
                .set("Authorization","Bearer "+ user.token)  
                .end(function(err,res){    
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    
        it('when character doesnt exists', function(done){
            chai.request(url)
                .get("/characters/3000")
                .set("Authorization","Bearer "+ user.token)  
                .end(function(err,res){
                    expect(res.body).includes({msg:'No se encuentra el personaje'});
                    done();
                });
        });

    });

    describe('testing POST /characters', function(){
        it('when character exist', function(done){
           let data= {
                "name": "Angelina Jolie",
                "imageCharacter":"prueba",
                "age": 55,
                "weight":1,
                "history":"prueba",
                "idMovieAssoc":1
            }
            chai.request(url)
                .post("/characters")
                .set("Authorization","Bearer "+ user.token)  
                .send(data)                
                .end(function(err,res){                        
                    expect(res.body).includes({msg:'El personaje que intenta ingresar, ya existe'});
                    done();
                });
        });
    });

    describe('testing DELETE /characters/:id', function(){
        it('when character doesnt exists', function(done){
            chai.request(url)
                .delete("/characters/3000")
                .set("Authorization","Bearer "+ user.token)  
                .end(function(err,res){
                    expect(res.body).includes({msg:'No se encuentra el personaje'});
                    done();
                });
        });
    });

    describe('testing PUT /characters/edit/:id', function(){
        it('when character doesnt exists', function(done){
            let data= {                 
                "age": 40,
                "weight": 45,
                "history":"prueba"
            }
            chai.request(url)
                .put("/characters/edit/200")
                .set("Authorization","Bearer "+ user.token)  
                .end(function(err,res){  
                    expect(res.status).to.equal(400);
                });
                done();
        });
  

        it('verify typeof age', function(done){
            let data= {                 
                "age": 's',
                "weight": 45,
                "history":"prueba"
            }
            chai.request(url)
                 .put("/characters/edit/1")
                 .set("Authorization","Bearer "+ user.token)  
                 .send(data)                
                 .end(function(err,res){                         
                    expect(res.body).includes({msg:'Validation error: La edad debe ser numerica'});
                    done();
                });
        });

        it('verify typeof weight', function(done){
           let data= {                
                "age": 45,
                "weight": 'd',
                "history":"prueba"
            }
            chai.request(url)
                .put("/characters/edit/1")
                .set("Authorization","Bearer "+ user.token)   
                .send(data)                
                .end(function(err,res){                        
                    expect(res.body).includes({msg:'Validation error: El peso debe ser numerico'});
                    done();
                });
        });
 
    });


