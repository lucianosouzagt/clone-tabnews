import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div style={{ margin: "20px" }}>
      <h1 style={{ marginBottom: 0 }}>Status</h1>
      <UpdateAt />
      <h2>Dependências</h2>
      <DatabaseStatus />
    </div>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });
  let updatedAtText = "Carregando...";
  if (!isLoading && data) {
    console.log(data);
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return (
    <span style={{ fontSize: "15px" }}>
      Última atualização: {updatedAtText}
    </span>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
  });
  let updatedAtText = "Carregando...";
  let db_version = "Carregando...";
  let db_max_connections = "Carregando...";
  let db_opened_connections = "Carregando...";
  if (!isLoading && data) {
    console.log(data);
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    db_version = data.dependencies.database.version;
    db_max_connections = data.dependencies.database.max_connections;
    db_opened_connections = data.dependencies.database.opened_connections;
  }
  return (
    <>
      <div style={{ paddingLeft: "30px", marginTop: "-15px" }}>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Database:</span>
        <br />
        <ul
          style={{
            fontWeight: "300",
            fontSize: "15px",
          }}
        >
          <li
            style={{
              margin: "-5px 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Versão:</span> {db_version}
          </li>
          <br />
          <li
            style={{
              margin: "-5px 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Conexões máximo:</span>{" "}
            {db_max_connections}
          </li>
          <br />
          <li
            style={{
              margin: "-5px 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Conexões abertas:</span>{" "}
            {db_opened_connections}
          </li>
        </ul>
      </div>
    </>
  );
}
