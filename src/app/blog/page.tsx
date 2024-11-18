import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Health Blogs",
  description: "Take a look at Educational Health Blogs provided by Klinik Satelit UI",
  // other metadata
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="UI Health Blogs"
        description="Take a look at Educational Health Blogs provided by Klinik Satelit UI"
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-8"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Blog;
