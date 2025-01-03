const { exec } = require("node:child_process");
const { time } = require("node:console");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();

      return;
    }
    process.stdout.write("\n🟢 Postgres está pronto e aceitando conecxões!\n");
  }
}

process.stdout.write("\n🔴 Aguardando Postgres aceitar conecxões!");
checkPostgres();