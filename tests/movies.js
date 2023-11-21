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
        // Connect to database before each test,i.e., "describe() test suite"
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
                console.log("Res.body in GET:", res.body);
            res.should.have.status(200);
            res.body.movies.should.be.a("array");
            res.body.movies.length.should.be.eql(0);
            done();
            });
        });
    });

    // POST route
    describe("/POST movie", () => {
        it("it should not POST a movie without title and other required fields", (done) => {
        console.log("Before request");
        chai
            .request(expressApp)
            .post("/movies")
            .send(missingTitleMovieData)
            .end((err, res) => {
                console.log("Res body in POST error:", res.body);
                res.should.have.status(500);
                res.body.should.be.a("object");
                if ('error' in res.body) {
                    res.body.error.should.have.property("title");
                    res.body.error.should.have.property("required").eql(true);
                } else {
                    // If 'errors' property is not present, you can handle it accordingly
                    console.error("No 'errors' property in the response body");
                }
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
                console.log("Res body POST success:", res.body);
               
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("Movie successfully added!");
                res.body.movie.should.have.property("plot");
                res.body.movie.should.have.property("genres");
                res.body.movie.should.have.property("runtime");
                res.body.movie.should.have.property("cast");
                res.body.movie.should.have.property("poster");
                res.body.movie.should.have.property("title");
                res.body.movie.should.have.property("fullplot");
                movieId = res.body.movie._id;
                console.log("Movie id:", movieId)
                done();
            });
        });
    });

    // GET/:id
    describe('/GET/:id Movie', () => {
        it('it should GET a movie by the given id', (done) => {
           chai
               .request(expressApp)
               .get(`/movies/${movieId}`)
               .end((err, res) => {
                console.log("Response from GET/:id:", res.body)
                console.log("Response End")
                    res.should.have.status(200);
                    res.body.movie.should.be.a('object');
                    res.body.should.have.property('message').eql('Movie successfully Retrieved!');
                    res.body.should.have.property('movie');
                    res.body.movie.should.have.property('title');
                    done();
                });
        });
    });
    

    // PUT route
    describe('PUT /movies/:id', () => {
        it('should update a movie by ID', (done) => {
            const updatedData = {
                title: "That Time I got Reincarnated as a Slime 2",
            };

            chai.request(expressApp)
                .put(`/movies/${movieId}`)
                .send(updatedData)
                .end((err, res) => {
                    console.log("Response data in PUT:", res.body)
                    console.log("PUT Response End")
                    if (err) {
                        console.error("Error occurred while updating movie:", err);
                        done(err);
                        return;
                    }
                    res.should.have.status(200);
                    res.body.movie.should.be.a('object');
                    res.body.should.have.property('message').eql('Movie successfully updated!');
                    res.body.movie.should.have.property('title');
                    done();
                });
        });
    });
    
    // DELETE route
    // describe('DELETE /movies/:id', () => {
    //     it('should delete a movie by ID', (done) => {
    //         chai.request(expressApp)
    //             .delete(`/movies/${movieId}`)
    //             .end((err, res) => {
    //                 console.log("Response in Delete:", res.body)
    //                 console.log("Delete Response End")
    //                 if (err) {
    //                     console.error("Error occurred while deleting movie:", err);
    //                     done(err);
    //                     return;
    //                 }
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('message').eql('Movie successfully deleted!');
    //                 res.body.getDeletedMovie.should.be.a('object').that.is.empty;
    //                 res.body.deletedMovie.should.have.property('acknowledged').eq(true);
    //                 res.body.deletedMovie.should.have.property('deletedCount').eq(1);
    //                 done();
    //             });
    //     });
    // });
    
    // end of parent block
});
