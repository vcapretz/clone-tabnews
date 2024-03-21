import { Client, QueryConfig, QueryResult, QueryResultRow } from "pg";

async function query<T extends QueryResultRow>(
  queryObject: string | QueryConfig,
  values?: any[],
): Promise<QueryResult<T>> {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();

  const result = await client.query<T>(queryObject, values);

  await client.end();

  return result;
}

export const database = { query };

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "development" ? false : true;
}
