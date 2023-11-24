import { database } from "infra/database";

export async function GET() {
  const { rows } = await database.query("SELECT NOW()");

  return Response.json({ success: true, rows }, { status: 200 });
}
