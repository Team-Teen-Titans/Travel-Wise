const request = require("supertest");

const server = "http://localhost:8080";

//server responds with text/html on a get request to 8080 when server is running in dev mode
describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });
  });
});
