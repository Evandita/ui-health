import { redirect } from "next/navigation"
import pool from "@/utils/postgres";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In Page",
  description: "",
};


const SigninPage = ({ searchParams }: { searchParams?: { alert?: string; error?: string } }) => {

  const alertMessage = searchParams?.alert || null;
  const errorMessage = searchParams?.error || null;

  const handleSubmit = async (formData: FormData) => {
    "use server";
  
    let account_email = formData.get("email");
    let account_password = formData.get("password");

    let err_msg = ""
  
    try {
      const res = await pool.query(
        'SELECT * FROM ACCOUNT WHERE account_email = $1 AND account_password = $2',
        [account_email, account_password]
      );
  
      if (res.rows.length > 0) {
        console.log("Successfully Logged In:", res.rows[0]);
        
        // Generate a cookie for the session
        const userCookie = {
          id: res.rows[0].account_id,
          name: res.rows[0].account_name,
          email: res.rows[0].account_email,
          isAdmin: res.rows[0].account_isadmin
        };

        cookies().set("user", JSON.stringify(userCookie), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24, // Cookie valid for 24 hours
        });

      } else {
        err_msg = "Login Failed: Invalid credentials"
        console.error(err_msg);
        redirect(`/signin?error=${encodeURIComponent(err_msg)}`);
      }
    } catch (error) {
      console.error("Error occurred during login:", err_msg);
      redirect(`/signin?error=${encodeURIComponent(err_msg)}`);
    }
    redirect("/"); 
  };
  
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url('/images/account/shape.svg')] dark:bg-[url('/images/account/shape-dark.svg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
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
                
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Log In to your account to have more access in Klinik Satelit UI web
                </p>
                
                <form
                  action={handleSubmit}
                >
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
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <button className="w-full py-4 text-white dark:text-black font-semibold bg-black dark:bg-yellow_bright rounded-md hover:bg-black/50 dark:hover:bg-yellow_bright/50 duration-300 ease-in-out">
                      Sign in
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
