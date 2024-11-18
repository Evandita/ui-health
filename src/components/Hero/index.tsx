import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-cover bg-center bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        style={{
          backgroundImage: 'url("/images/klinik-makara-1.png")',
        }}
      >
        <div className="absolute inset-0 bg-white opacity-50 dark:bg-dark dark:opacity-80"></div>

        <div className="container relative z-20">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Book Online Health Appointment Now
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-dark dark:text-body-color-dark sm:text-lg md:text-xl">
                  Klinik Satelit UI offers convenient online booking for a range of health services, ensuring easy access to quality care. Schedule your appointment with our specialists today, from general consultations to specialized treatments, right at your fingertips.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/appointment"
                    className="rounded-sm bg-yellow_bright px-8 py-4 text-base font-semibold text-dark duration-300 ease-in-out hover:bg-yellow_bright/50"
                  >
                    Appointment
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/50 dark:bg-white dark:text-dark dark:hover:bg-white/50"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Hero;
