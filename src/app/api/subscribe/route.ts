import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/postgres";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, studentEmail } = body;

    if (!studentName || !studentEmail) {
      return NextResponse.json(
        { error: "studentName and studentEmail are required" },
        { status: 400 }
      );
    }

    const res = await pool.query(
      "INSERT INTO notification (student_name, student_email) VALUES ($1, $2) RETURNING *",
      [studentName, studentEmail]
    );

    return NextResponse.json(
      { message: "Notification subscribed successfully", data: res.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to notification:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
