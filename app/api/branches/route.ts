import { NextRequest, NextResponse } from "next/server";
import branchData from "@/data/branches_by_province.json";

export type Branch = {
  code: string;
  street: string;
  number: string;
  locality: string;
  province: string;
  hours: string;
};

const byProvince = branchData as Record<string, Branch[]>;

export async function GET(request: NextRequest) {
  const province = request.nextUrl.searchParams.get("province");

  if (!province) {
    return NextResponse.json({ error: "province is required" }, { status: 400 });
  }

  const branches = byProvince[province.toUpperCase()] ?? [];

  return NextResponse.json(branches);
}
