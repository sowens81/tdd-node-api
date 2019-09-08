var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://127.0.0.1:8080");

// UNIT test begin

describe("SAMPLE unit test",function(){

    // #1 should return home page
  
    it("should return home page",function(done){
  
      // calling home page api
      server
      .get("/")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.error.should.equal(false);
        done();
      });
    });

    it("should add two numbers",function(done){
        
        //Call add API
        server
        .post('/add')
        .send({num1 : 10, num2 : 20})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            res.body.data.should.equal(30);
            done();
        });
    });  

    it("It should return 404",function(done){

        //Call Invalid API url
        server
        .get('/login')
        .expect(404)
        .end(function(err,res){
            // HTTP status should be 404
            res.status.should.equal(404);
            done();
          });
    
    });
});