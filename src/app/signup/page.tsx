import { redirect } from "next/navigation"
import pool from "@/utils/postgres";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up Page",
  description: "",
  // other metadata
};
const SignupPage = async ({ searchParams }: { searchParams?: { error?: string } }) => {

  const errorMessage = searchParams?.error || "";

  const handleSubmit = async (formData: FormData) => {
    "use server";
  
    let account_name = formData.get("name");
    let account_email = formData.get("email");
    let account_password = formData.get("password");
    
    let err_msg = ""
    
    try {

      const check = await pool.query (
        'SELECT * FROM ACCOUNT WHERE account_email = $1', 
        [account_email]
      )

      if (check.rows.length > 0) {
        err_msg = "Email already used"
        console.error(err_msg);
        redirect(`/signup?error=${encodeURIComponent(err_msg)}`);
      }

      const res = await pool.query(
        'INSERT INTO ACCOUNT (account_name, account_email, account_password, account_isAdmin) VALUES ($1, $2, $3, FALSE) RETURNING *',
        [account_name, account_email, account_password],
      );
  
      if (res.rows.length > 0) {
        console.log("Successfully Create Account:", res.rows[0]);

      } else {
        err_msg = "Signin Failed. Please try again later."
        console.error(err_msg);
        redirect(`/signup?error=${encodeURIComponent(err_msg)}`);
      }
    } catch (error) {
      console.error("Error occurred during signin:", error);
      redirect(`/signup?error=${encodeURIComponent(err_msg)}`);
    } 

    redirect(`/signin?alert=${encodeURIComponent("Account created succesfully, please sign in to your account.")}`)
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url('/images/account/shape.svg')] dark:bg-[url('/images/account/shape-dark.svg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-yellow_bright/50 px-6 py-10 dark:bg-blue/50 sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                Log In to your account to have more access in Klinik Satelit UI web
                </p>

                {/* Alert message */}
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
                  <div className="mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span>
                        By creating account means you agree to the
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Terms and Conditions{" "}
                        </a>
                        , and our
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Privacy Policy{" "}
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="mb-6">
                    <button className="w-full py-4 text-white dark:text-black font-semibold bg-black dark:bg-yellow_bright rounded-md hover:bg-black/50 dark:hover:bg-yellow_bright/50 duration-300 ease-in-out">
                      Sign up
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignupPage;