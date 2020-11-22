const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const path = require("path");

chai.should();

chai.use(chaiHttp);

describe('Test API', () => {
    // getAll
    describe("get all /api/movies/", () => {
        it("get all", (done) => {
            chai.request("http://localhost:5000")
                .get("/api/movies/")
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    // getById
    describe("getById /api/movies/", () => {
        it("getById", (done) => {
            const taskId = '5fba5cdd654c75a8c29be156';
            chai.request("http://localhost:5000")
                .get("/api/movies/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })

    // import movie file
    describe("import movie file /api/movies/", () => {
        it("import movie file", (done) => {
            chai.request("http://localhost:5000")
                .post("/api/movies/import")
                .field("Content-Type", "multipart/form-data")
                .attach("file", path.resolve(__dirname, "../test/test.txt"))
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                })
        })
    })

    // add movie
    describe("ADD MOVIE /api/movies/", () => {
        it("Add movie", (done) => {
            const movie = {
                Title: "Movie",
                ReleaseYear: 1942,
                Format: "DVD",
                Stars: "Humphrey Bogart"
            }
            chai.request("http://localhost:5000")
                .post("/api/movies/")
                .send(movie)
                .end((err, response) => {
                    response.should.have.status(201);
                    done();
                })
        })
    })

    // delete movie
    describe("DELETE /api/movies/id", () => {
        it("It should DELETE an existing task", (done) => {
            const taskId = '5fba5cdd654c75a8c29be156';
            chai.request("http://localhost:5000")
                .delete("/api/movies/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        })
    })
})

