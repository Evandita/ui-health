"use client";

import SectionTitle from "../Common/SectionTitle";

const Video = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Your Health, Our Priority"
          paragraph="Klinik Satelit UI is dedicated to providing you with accessible, quality healthcare. Watch the video to learn more about our services and how we ensure the best care for our patients."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[770px] overflow-hidden rounded-md">
              <div className="relative aspect-[77/40] items-center justify-center group">
                <iframe
                  className="w-full h-full rounded-md"
                  src="https://www.youtube.com/embed/L8lVmMlymg4?autoplay=0" // Remove mute to allow sound
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-md pointer-events-none"></div> {/* Dark overlay with pointer-events set to none */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
