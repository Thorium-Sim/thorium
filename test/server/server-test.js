var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var {
  graphQLServer: server,
  graphQLServerInstance,
  websocketServerInstance
} = require("../../server/server.js");
chai.use(chaiHttp);

describe("Server", function() {
  it("should provide a /schema endpoint", function(done) {
    chai
      .request(server)
      .get("/schema")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should provide a /status endpoint", function(done) {
    chai
      .request(server)
      .get("/status")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should provide a /graphql endpoint", function(done) {
    chai
      .request(server)
      .get("/graphql")
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("GET query missing.");
        done();
      });
  });
  it("should allow posts on /graphql", function(done) {
    chai
      .request(server)
      .post("/graphql")
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body.errors[0].message).to.equal("Must provide document");
        done();
      });
  });
  it("should properly parse a graphql query", function(done) {
    chai
      .request(server)
      .post("/graphql")
      .send({
        query:
          "query {\n__schema{\nqueryType{\nkind\nname\ndescription\n}\n}\n}\n",
        variables: null
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data.__schema.queryType.name).to.equal("Query");
        done();
      });
  });
  afterAll(function() {
    graphQLServerInstance.close();
    websocketServerInstance.close();
  });
});
