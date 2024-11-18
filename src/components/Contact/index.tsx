import { redirect } from "next/navigation"
import pool from "@/utils/postgres";
import NewsLatterBox from "./NewsLatterBox";
import { FaWhatsapp, FaPhone } from "react-icons/fa"; // Importing icons from react-icons as placeholders

const Contact = () => {

  const handleSubmit = async (formData: FormData) => {
    "use server";

    let student_name = formData.get("studentName");
    let student_email = formData.get("studentEmail");
    let student_message = formData.get("studentMessage");

    try {
      const res = await pool.query(
        'INSERT INTO ticket (student_name, student_email, student_message) VALUES ($1, $2, $3) RETURNING *',
        [student_name, student_email, student_message]
      )

      console.log("Ticket sent:", res);
    } catch (error) {
      console.error("Error sending ticket:", error);
      throw error;
    }
    redirect("/contact");
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-20 lg:py-28">
      {/* SVG Background */}
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url('/images/notifications/shape.svg')] bg-cover bg-center bg-no-repeat"></div>
      
      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-white/80 px-8 py-11 shadow-three dark:bg-gray-dark/80 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Contact Us Now
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form
                action={handleSubmit}
              >
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white "
                      >
                        Your Name
                      </label>
                      <input
                        name="studentName"
                        type="text"
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:ring-yellow_bright focus:ring-2 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark "
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        name="studentEmail"
                        type="email"
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:ring-yellow_bright focus:ring-2 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="studentMessage"
                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:ring-yellow_bright focus:ring-2 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark "
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button 
                    type = "submit"
                    className="font-semibold rounded-sm bg-yellow_bright px-9 py-4 text-base font-medium text-black shadow-submit duration-300 hover:bg-yellow_bright/50 dark:shadow-submit-dark">
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>        
          </div>
          
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
            
            {/* Contact Information Section */}
            <div className="mt-8 rounded-sm bg-white/80 p-6 shadow-three dark:bg-gray-dark/80">
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white">Any Questions?</h3>
              
              <div className="flex items-center mb-4">
                <FaWhatsapp className="text-green-500 mr-3" size={24} />
                <span className="text-base font-medium text-body-color dark:text-body-color-dark">
                089602912060
                </span>
              </div>
              
              <div className="flex items-center">
                <FaPhone className="text-gray-700 dark:text-gray-300 mr-3" size={24} />
                <span className="text-base font-medium text-body-color dark:text-body-color-dark">
                021-78888176
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
