import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/utils/postgres";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  console.log("test")
  console.log(req)
  if (req.method === "POST") {
    const { student_id, service_id, description, student_name, appointment_date, appointment_time } = req.body;
    try {

      const result = await pool.query (
        'INSERT INTO appointment (student_id, service_id, description, student_name, appointment_date, appointment_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [student_id, service_id, description, student_name, appointment_date, appointment_time]
      );

      res.status(200).json({ message: "Appointment booked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to book appointment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
