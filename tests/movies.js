// Set env variable to test during testing
process.env.NODE_ENV = "test";

import connectToDatabase from "../db/dbconn.js";
import chai from "chai";
import chaiHttp from "chai-http";
import expressApp from "../app.js";
import { testMovieData, missingTitleMovieData } from "./testData.js";

chai.should();
chai.use(chaiHttp);

// Mother block
describe("Movies", () => {
    let collection;
    let movieId;

    before(async () => {
        const db = await connectToDatabase();
        collection = db.collection("movies_testing");
    });

    before(async () => {
        // Clear database before each test
        await collection.deleteMany({});
    });

    // Test /GET route
    describe("/GET Movies", () => {
        it("it should GET all the movies", (done) => {
        chai
            .request(expressApp)
            .get("/movies")
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(0);
            done();
            });
        });
        console.log("data collection:", collection)
    });

    // POST route
    describe("/POST movie", async () => {
        it("it should not POST a movie without title and other required fields", async () => {
        console.log("Before request");
        chai
            .request(expressApp)
            .post("/movies")
            .send(missingTitleMovieData)
            .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("errors");
            res.body.errors.should.have.property("title");
            res.body.errors.title.should.have.property("kind").eql("required");
            done();
            });
        });
        console.log("After request");
        it("should POST a new movie", (done) => {
        chai
            .request(expressApp)
            .post("/movies")
            .send(testMovieData)
            .end((err, res) => {
            res.should.have.status(200);
            // console.log("Res body:", res.body.newMovie);
            // should.exist(res.body);
            res.body.should.be.a("object");
            res.body.should.have
                .property("message")
                .eql("Movie successfully added!");
            res.body.newMovie.should.have.property("plot");
            res.body.newMovie.should.have.property("genres");
            res.body.newMovie.should.have.property("runtime");
            res.body.newMovie.should.have.property("cast");
            res.body.newMovie.should.have.property("poster");
            res.body.newMovie.should.have.property("title");
            res.body.newMovie.should.have.property("fullplot");
            res.body.newMovie.should.have.property("languages");
            res.body.newMovie.should.have.property("released");
            res.body.newMovie.should.have.property("directors");
            res.body.newMovie.should.have.property("rated");
            res.body.newMovie.should.have.property("awards");
            res.body.newMovie.should.have.property("lastupdated");
            res.body.newMovie.should.have.property("year");
            res.body.newMovie.should.have.property("imdb");
            res.body.newMovie.should.have.property("countries");
            res.body.newMovie.should.have.property("tomatoes");
            res.body.newMovie.should.have.property("num_mflix_comments");

            movieId = res.body.newMovie._id;
            console.log("Movie id:", movieId)
            done();
            });
        });
    });

    /******************************************************************/
    // GET SINGLE MOVIE BY ID
    /******************************************************************/
    describe('/GET/:id Move', () => {
        it('it should GET a movie by the given id', (done) => {
           
           chai
               .request(expressApp)
               .get(`/movies/${movieId}`)
               .end((err, res) => {
                console.log("Response:", res.body)
                console.log("Response End")
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Movie successfully Retrieved!');
                    res.body.should.have.property('getMovie');
                    res.body.getMovie.should.have.property('title');
                    done();
                });
        });
    });

    // PUT route
    describe('PUT /movies/:id', () => {
        it('should update a movie by ID', (done) => {
            const updatedData = {
                // Your updated data
            };

            chai.request(expressApp)
                .put(`/movies/${movieId}`)
                .send(updatedData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Movie successfully updated!');
                    // Add more expectations as needed
                    done();
                });
        });
    });
    

    // end of parent block
});
