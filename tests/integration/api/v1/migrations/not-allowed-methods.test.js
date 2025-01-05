import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});
describe("PUT, DELETE, PATCH /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Checking not allowed methods", async () => {
      const notAllowedMethods = ["PUT", "DELETE", "PATCH"];
      for (const method of notAllowedMethods) {
        let response = await fetch("http://localhost:3000/api/v1/migrations", {
          method: method,
        });
        expect(response.status).toBe(405);
      }
    });
  });
});
