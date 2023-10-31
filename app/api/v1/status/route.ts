import { database } from "../../../../infra/database";

export async function GET() {
  const result = await database.query("SELECT NOW()");

  return Response.json({ success: true }, { status: 200 });
}
