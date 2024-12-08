import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/postgres";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, studentEmail, studentMessage } = body;

    if (!studentName || !studentEmail) {
      return NextResponse.json(
        { error: "studentName and studentEmail and studentMessage are required" },
        { status: 400 }
      );
    }

    const res = await pool.query(
      'INSERT INTO ticket (student_name, student_email, student_message) VALUES ($1, $2, $3) RETURNING *',
        [studentName, studentEmail, studentMessage]
    );

    return NextResponse.json(
      { message: "Ticket sent successfully", data: res.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending ticket:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
