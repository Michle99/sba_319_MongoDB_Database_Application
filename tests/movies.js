// Set env variable to test during testing
process.env.NODE_ENV = "test";

import connectToDatabase from "../db/dbconn.js";
import chai from "chai";
import chaiHttp from "chai-http";
import expressApp from "../app.js";

chai.should();
chai.use(chaiHttp);

// Mother block
describe("Movies", () => {
    let collection;

    before(async () => {
        const db = await connectToDatabase();
        collection = db.collection("movies_testing");
    });

    beforeEach(async () => {
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
    });

    // POST route
    describe("/POST movie", async () => {
        it("it should not POST a movie without title and other required fields", async () => {
        console.log("Before request");
        let testMovieData = {
            plot: "Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!",
            genres: ["isekai", "slime", "magic"],
            runtime: 23,
            cast: ["Great Rimuru Tempest", "Shion", "Ranga"],
            poster:
            "https://theglobalcoverage.com/wp-content/uploads/2021/01/That-Time-I-Got-Reincarnated-as-a-Slime-season-1.jpg",
            // "title": "That Time I got Reincarnated as a Slime",
            fullplot:
            "Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!",
            languages: ["English", "Japanese"],
            released: "2021-04-09T00:00:00.000Z",
            directors: [],
            rated: "TV-G",
            awards: {},
            lastupdated: "",
            year: 2018,
            imdb: {},
            countries: ["JAPAN"],
            type: "ANIME",
            tomatoes: {
            viewer: {},
            fresh: 6,
            critic: {
                rating: 7.6,
                numReviews: 6,
                meter: 100,
            },
            rotten: 0,
            lastUpdated: "",
            },
            num_mflix_comments: 0,
        };

        chai
            .request(expressApp)
            .post("/movies")
            .send(testMovieData)
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
        it("should POST a new movie", () => {
        let testMovieData = {
            plot: "Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!",
            genres: ["isekai", "slime", "magic"],
            runtime: 23,
            cast: ["Great Rimuru Tempest", "Shion", "Ranga"],
            poster:
            "https://theglobalcoverage.com/wp-content/uploads/2021/01/That-Time-I-Got-Reincarnated-as-a-Slime-season-1.jpg",
            title: "That Time I got Reincarnated as a Slime",
            fullplot:
            "Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!",
            languages: ["English", "Japanese"],
            released: "2021-04-09T00:00:00.000Z",
            directors: [],
            rated: "TV-G",
            awards: {},
            lastupdated: "",
            year: 2018,
            imdb: {},
            countries: ["JAPAN"],
            type: "ANIME",
            tomatoes: {
            viewer: {},
            fresh: 6,
            critic: {
                rating: 7.6,
                numReviews: 6,
                meter: 100,
            },
            rotten: 0,
            lastUpdated: "",
            },
            num_mflix_comments: 0,
        };
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
            });
        });
    });

    


  
});
