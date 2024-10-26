import SectionTitle from "../Common/SectionTitle";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-20">
          {/* Form for Booking an Appointment */}
          <div className="max-w-[600px] w-full mb-12 lg:mb-0" data-wow-delay=".15s">
            <form className="space-y-6 bg-white p-8 rounded-md shadow-lg dark:bg-gray-800">
              <h3 className="text-2xl text-center font-bold text-black dark:text-white">Online Appointment Form</h3>

              {/* Row 1: Student Name and Student ID */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Student Name</label>
                  <input
                    type="text"
                    title="Enter your full name here"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Student ID</label>
                  <input
                    type="text"
                    title="Enter your student ID here"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-400"
                    placeholder="Enter your student ID"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Appointment Date and Time */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Appointment Date</label>
                  <input
                    type="date"
                    title="Select your preferred appointment date"
                    className="w-full cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-400 appearance-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Appointment Time</label>
                  <input
                    type="time"
                    title="Select your preferred appointment time"
                    className="w-full cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-400 appearance-none"
                    required
                  />
                </div>
              </div>

              {/* Health Services (Full width) */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Health Services</label>
                <select
                  title="Choose the type of health service you need"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-400"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="general-consultation">General Consultation</option>
                  <option value="dental-checkup">Dental Checkup</option>
                  <option value="psychology-counseling">Psychology Counseling</option>
                  <option value="physical-exam">Physical Examination</option>
                </select>
              </div>

              {/* Description (Optional) */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Description (Optional)</label>
                <textarea
                  title="Provide any additional information related to your appointment"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-400"
                  placeholder="Provide additional information if needed"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  title="Submit your appointment booking"
                  className="w-full py-2 text-white bg-primary rounded-md hover:bg-primary-dark dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>

          {/* Right Column Content - Text */}
          <div className="max-w-[470px]">
          <SectionTitle
                title="Not Feeling Well?"
                paragraph="Book an online health appointment with Klinik Satelit UI to get a comprehensive health checkup with professionals by filling in the form now. Our experienced medical staff is ready to assist you with personalized care, addressing all your health concerns. Whether it's a routine checkup or a specific issue, we offer a wide range of services tailored to meet your needs. Don't wait—ensure your well-being by scheduling your appointment today, and take the first step towards a healthier tomorrow with ease and convenience."
                mb="44px"
              />
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
