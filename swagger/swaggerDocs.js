export const swaggerOptionsConfig = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "MongoDB Node.js Express Server Application",
        version: "0.1.0",
        description:
          "This is a Movies CRUD API made with MongoDB, Express and Node.js and documented with Swagger.",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Michael O",
          url: "https://github.com/Michle99",
          email: "https://github.com/Michle99",
        },
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["../routes/*.js"],
};

export const swaggerAPIModel = {
  /***
   *  @swagger
   * components:
   *    schemas:
   *      Movie:
   *        type: object
   *        required:
   *          - plot
   *          - genres
   *          - type
   *          - title
   *          - poster
   *          - cast
   *          - fullplot
   *          - runtime
   *        properties
   *          id:
   *            type: string
   *            description: The auto-generated id of the movie
   *          plot:
   *            type: string
   *            description: The plot of the movie
   *          
   */
}