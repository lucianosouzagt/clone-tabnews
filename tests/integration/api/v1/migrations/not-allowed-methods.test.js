import database from "infra/database";

beforeAll(cleanDatabase);
async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
test("Not allowed methods to api/v1/migrations should return 405", async () => {
  const notAllowedMethods = ["PUT", "DELETE", "PATCH"];
  for (const method of notAllowedMethods) {
    let response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: method,
    });
    expect(response.status).toBe(405);
  }
});
