import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/postgres";

export async function GET(req: NextRequest) {
  try {

    const result = await pool.query(`SELECT DISTINCT ON (student_email)  notification_id, student_name, student_email FROM notification`,
      []
    );

    return NextResponse.json(
      { message: "Succesfully Get Subscribed Accounts", data: result.rows },
      { status: 201}
    );
  } catch (error) {
    console.error("Error sending ticket:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
