import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import pool from "@/utils/postgres";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Notification from "@/components/Notification";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "",
  // other metadata
};

let userData = null;

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
};

const deleteNotificationByEmail = async(student_email) => {
  "use server"

  try {

    const result = await pool.query(`DELETE FROM notification WHERE student_email = $1 RETURNING *`,
      [student_email]
    );
    const data = result.rows;
    console.log("Deleted data: ", data);

  } catch (error) {
    console.error("Error Deleting data: ", error);
    throw error;
  }

  redirect("/profile")
}

const fetchAllNotifications = async() => {
  try {

    const result = await pool.query(`SELECT DISTINCT ON (student_email)  notification_id, student_name, student_email FROM notification`,
      []
    );
    const data = result.rows;
    //console.log("Fetched data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

const deleteMessageById = async(id) => {
  "use server"

  try {

    const result = await pool.query(`DELETE FROM ticket WHERE ticket_id = $1 RETURNING *`,
      [id]
    );
    const data = result.rows;
    console.log("Deleted data: ", data);

  } catch (error) {
    console.error("Error Deleting data: ", error);
    throw error;
  }

  redirect("/profile")
}


const fetchAllMessages = async() => {
  try {

    const result = await pool.query(`SELECT * FROM ticket`,
      []
    );
    const data = result.rows;
    //console.log("Fetched data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

const fetchUpcomingAppointments = async() => {
  try {

    const result = await pool.query(`SELECT * FROM appointment WHERE status = $1 AND appointment_date >= $2 ORDER BY appointment_date ASC, appointment_time ASC`,
      ['Approved', getTodayDate()]
    );
    const data = result.rows;
    //console.log("Fetched data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

const fetchAllAppointments = async() => {
  try {

    const result = await pool.query(`SELECT * FROM appointment WHERE status != $1 AND status != $2`,
      ['Declined', 'Approved']
    );
    const data = result.rows;
    //console.log("Fetched data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

const fetchAppointments = async() => {
  try {

    const result = await pool.query(`SELECT * FROM appointment WHERE account_id = $1 ORDER BY appointment_id DESC`,
      [userData.id]
    );
    const data = result.rows;
    console.log("Fetched data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

const deleteAppointmentById = async(id) => {
  "use server"

  try {

    const result = await pool.query(`DELETE FROM appointment WHERE appointment_id = $1 RETURNING *`,
      [id]
    );
    const data = result.rows;
    console.log("Deleted data: ", data);

  } catch (error) {
    console.error("Error Deleting data: ", error);
    throw error;
  }

  redirect("/profile")
}

const cancelAppointmentById = async(id) => {
  "use server"

  try {

    const result = await pool.query(`UPDATE appointment SET status = $1 WHERE appointment_id = $2 RETURNING *`,
      ['Declined', id]
    );
    const data = result.rows;
    console.log("Updated data: ", data);

  } catch (error) {
    console.error("Error Updating data: ", error);
    throw error;
  }

  redirect("/profile")
}

const approveAppointmentById = async(id) => {
  "use server"

  try {

    const result = await pool.query(`UPDATE appointment SET status = $1 WHERE appointment_id = $2 RETURNING *`,
      ['Approved', id]
    );
    const data = result.rows;
    console.log("Updated data: ", data);

  } catch (error) {
    console.error("Error Updating data: ", error);
    throw error;
  }

  redirect("/profile")
}

const fetchHealthServices = async() => {
  try {

    const result = await pool.query(`SELECT * from healthservice`
    );
    const data = result.rows;

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

const ProfilePage = async ({ searchParams }: { searchParams?: { alert?: string; error?: string } }) => {

  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (userCookie) {
    try {
      userData = JSON.parse(userCookie.value); // Parse the JSON string from the cookie value
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  const errorMessage = searchParams?.error || "";
  const alertMessage = searchParams?.alert || null;

  const handleSubmit = async (formData: FormData) => {
    "use server";
  
    let account_name = formData.get("name");
    let account_email = formData.get("email");
    let account_password = formData.get("password");
    
    let err_msg = ""
    
    try {

      if (account_email != userData.email) {
        const check = await pool.query (
          'SELECT * FROM ACCOUNT WHERE account_email = $1', 
          [account_email]
        )
  
        if (check.rows.length > 0) {
          err_msg = "Email already used"
          console.error(err_msg);
          redirect(`/profile?error=${encodeURIComponent(err_msg)}`);
        }
      }

      const res = await pool.query(
        'UPDATE ACCOUNT SET account_name = $1, account_email = $2, account_password = $3 WHERE account_id = $4 RETURNING *',
        [account_name, account_email, account_password, userData.id],
      );
  
      if (res.rows.length > 0) {
        console.log("Account Succesfully Updated: ", res.rows[0]);

      } else {
        err_msg = "Update Failed. Please try again later."
        console.error(err_msg);
        redirect(`/profile?error=${encodeURIComponent(err_msg)}`);
      }
    } catch (error) {
      console.error("Error occurred during Update:", error);
      redirect(`/profile?error=${encodeURIComponent(err_msg)}`);
    } 

    redirect(`/profile?alert=${encodeURIComponent("Account succesfully updated")}`)
  };

  let appointments = null;
  let upcomingAppointments = await fetchUpcomingAppointments();
  let messages = await fetchAllMessages();
  let notifications = await fetchAllNotifications();

  if (userData.isAdmin == true) {
    appointments = await fetchAllAppointments();
  }
  else {
    appointments = await fetchAppointments();
  }

  
  const healthServices = await fetchHealthServices();

  function getHealthServiceNameById(id) {
  
    const service = healthServices.find(item => item.healthservice_id === id);
    return service ? service.healthservice_name : 'Service not found';
  }

  return (
    <>
      <Breadcrumb
          pageName="Profile"
          description="Welcome to your profile page. Feel free to manage your account settings and view appointment history"
        />

      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px] mt-10">
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url('/images/profile/shape.svg')] dark:bg-[url('/images/profile/shape-dark.svg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Profile Settings
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  View and update your account in profile settings
                </p>

                {/* Display Alert Message */}
                {alertMessage && (
                  <div className="mb-6 text-green-600 text-center font-medium">
                    {alertMessage}
                  </div>
                )}

                {/* Error message */}
                {errorMessage && (
                  <div className="mb-6 text-red-600 text-center font-medium">
                    {errorMessage}
                  </div>
                )}
                
                <form
                  action={handleSubmit}
                >
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                      defaultValue={userData ? userData.name : ""}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                      defaultValue={userData ? userData.email : ""}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="block mb-1 font-medium text-gray-700 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:border-dark dark:focus:ring-yellow_bright"
                      defaultValue={userData ? userData.password : ""}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <button className="w-full py-4 text-white dark:text-black font-semibold bg-black dark:bg-yellow_bright rounded-md hover:bg-black/50 dark:hover:bg-yellow_bright/50 duration-300 ease-in-out">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {userData.isAdmin == false ? (

          /* User's Online Appointment History*/ 

        <div className="container mt-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[700px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Appointment History
                </h3>

                {appointments.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No appointment history available.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <li
                        key={index}
                        className="p-4 border rounded-lg bg-white shadow-md dark:bg-black dark:border-dark mb-10"
                      >
                        <h4 className="font-bold text-lg text-black dark:text-white mb-5">
                          Appointment #{appointment.appointment_id}
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Name</span>
                            <span>: {appointment.student_name}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Student Id</span>
                            <span>: {appointment.student_id}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Health Service</span>
                            <span>: {getHealthServiceNameById(appointment.service_id)}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Date</span>
                            <span>: {new Date(appointment.appointment_date).toLocaleDateString()}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Time</span>
                            <span>: {appointment.appointment_time}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Description</span>
                            <span>: {appointment.description}</span>
                          </div>
                          <div style={{display: "flex"}}
                          className={`${
                            appointment.status === "Declined"
                              ? "text-red-500"
                              : appointment.status === "Approved"
                              ? "text-green-500"
                              : "text-black dark:text-white"
                          }`}
                          >
                            <span style={{ width: "150px", fontWeight: "bold" }}>Status</span>
                            <span>: {appointment.status}</span>
                          </div>

                          {appointment.status == "Pending Approval" ?
                          (<form action={async () => {
                            "use server";
                            await deleteAppointmentById(appointment.appointment_id)}}>
                            <button
                              type="submit"
                              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-500/50"
                            >
                              Cancel Appointment
                            </button>
                          </form> ) : (<></>)
                          }
                                                   
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        ) : (
          <>
          <div className="container mt-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[700px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                <h3 className=" mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Pending Appointment
                </h3>

                {appointments.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No pending appointment available.
                  </p>
                ) : (
                  
                  <ul className="space-y-5">
                    {appointments.map((appointment, index) => (
                      <li
                        key={index}
                        className="p-4 border rounded-lg bg-white shadow-md dark:bg-black dark:border-dark"
                      >
                        <h4 className="font-bold text-lg text-black dark:text-white mb-5">
                          Appointment #{appointment.appointment_id}
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Name</span>
                            <span>: {appointment.student_name}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Student Id</span>
                            <span>: {appointment.student_id}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Health Service</span>
                            <span>: {getHealthServiceNameById(appointment.service_id)}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Date</span>
                            <span>: {new Date(appointment.appointment_date).toLocaleDateString()}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Time</span>
                            <span>: {appointment.appointment_time}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Description</span>
                            <span>: {appointment.description}</span>
                          </div>
                          <div style={{display: "flex"}}
                          className={`${
                            appointment.status === "Declined"
                              ? "text-red-500"
                              : appointment.status === "Approved"
                              ? "text-green-500"
                              : "text-black dark:text-white"
                          }`}
                          >
                            <span style={{ width: "150px", fontWeight: "bold" }}>Status</span>
                            <span>: {appointment.status}</span>
                          </div>

                          <div className="flex space-x-4">
                            <form
                              action={async () => {
                                "use server";
                                await cancelAppointmentById(appointment.appointment_id);
                              }}
                            >
                              <button
                                type="submit"
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-500/50"
                              >
                                Decline
                              </button>
                            </form>
                            <form
                              action={async () => {
                                "use server";
                                await approveAppointmentById(appointment.appointment_id);
                              }}
                            >
                              <button
                                type="submit"
                                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-500/50"
                              >
                                Approve
                              </button>
                            </form>
                          </div>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        
        


        <div className="container mt-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[700px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Upcoming Appointment
                </h3>

                {appointments.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No upcoming appointment available.
                  </p>
                ) : (
                  
                  <ul className="space-y-5">
                    {upcomingAppointments.map((appointment, index) => (
                      <li
                        key={index}
                        className="p-4 border rounded-lg bg-white shadow-md dark:bg-black dark:border-dark"
                      >
                        <h4 className="font-bold text-lg text-black dark:text-white mb-5">
                          Appointment #{appointment.appointment_id}
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Name</span>
                            <span>: {appointment.student_name}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Date</span>
                            <span>: {new Date(appointment.appointment_date).toLocaleDateString()}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Time</span>
                            <span>: {appointment.appointment_time}</span>
                          </div>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>





        <div className="container mt-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[700px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Inbox
                </h3>

                {messages.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No messages available.
                  </p>
                ) : (
                  
                  <ul className="space-y-4">
                    {messages.map((message, index) => (
                      <li
                        key={index}
                        className="p-4 border rounded-lg bg-white shadow-md dark:bg-black dark:border-dark mb-5"
                      >
                        <h4 className="font-bold text-lg text-black dark:text-white mb-5">
                          Ticket #{message.ticket_id}
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Name</span>
                            <span>: {message.student_name}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Email</span>
                            <span>: {message.student_email}</span>
                          </div>
                          <div style={{ display: "flex" }} className="mt-5">
                            <span style={{ width: "150px", fontWeight: "bold" }}>Message</span>
                          </div>
                          <p>{message.student_message}</p>
                          
                        </div>
                        <form action={async () => {
                            "use server";
                            await deleteMessageById(message.ticket_id)}}>
                            <button
                              type="submit"
                              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-500/50"
                            >
                              Remove
                            </button>
                          </form> 
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>





        <div className="container mt-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[700px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                
                <Notification />
                
                <h3 className="mb-10 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Subscribed Account
                </h3>

                {notifications.length === 0 ? (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No account subscribed.
                  </p>
                ) : (
                  
                  <ul className="space-y-4">
                    {notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="p-4 border rounded-lg bg-white shadow-md dark:bg-black dark:border-dark mb-5"
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Name</span>
                            <span>: {notification.student_name}</span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "150px", fontWeight: "bold" }}>Email</span>
                            <span>: {notification.student_email}</span>
                          </div>
                          
                        </div>
                        <form action={async () => {
                            "use server";
                            await deleteNotificationByEmail(notification.student_email)}}>
                            <button
                              type="submit"
                              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-500/50"
                            >
                              Unsubscribe
                            </button>
                          </form> 
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        </>
        )}

      </section>

      

      

    </>
  );
};
export default ProfilePage;