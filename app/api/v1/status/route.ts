import { database } from "infra/database";

export async function GET() {
  const updatedAt = new Date().toISOString();
  const { rows: version } = await database.query("SHOW server_version;");
  const { rows: maxConn } = await database.query("SHOW max_connections;");
  const { rows: openedConn } = await database.query(
    "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    [process.env.POSTGRES_DB],
  );

  return Response.json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version[0].server_version,
        max_connections: parseInt(maxConn[0].max_connections, 10),
        opened_connections: openedConn[0].count,
      },
    },
  });
}
