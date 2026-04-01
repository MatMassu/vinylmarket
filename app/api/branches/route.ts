import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export type Branch = {
  code: string;
  street: string;
  number: string;
  locality: string;
  province: string;
  hours: string;
};

export async function GET(request: NextRequest) {
  const province = request.nextUrl.searchParams.get("province");

  if (!province) {
    return NextResponse.json({ error: "province is required" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data", "branches_by_province.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const byProvince: Record<string, Branch[]> = JSON.parse(raw);

  const branches = byProvince[province.toUpperCase()] ?? [];

  return NextResponse.json(branches);
}
