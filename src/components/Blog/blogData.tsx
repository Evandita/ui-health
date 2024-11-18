import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Setiap Nyawa Berharga!",
    paragraph:
      "Berdasarkan Organisasi Kesehatan Dunia (WHO) pada tahun 2019, tercatat ada 703.000 orang yang meninggal akibat bunuh diri setiap tahunnya. ",
    image: "/images/blog1.png",
    author: {
      name: "konselingmakaraui",
      image: "/favicon.ico",
      designation: "Content Writer",
    },
    tags: ["psychology"],
    publishDate: "2024",
  },
  {
    id: 2,
    title: "Stay Connected: Menangani Perasaan Kesepian selama Ujian",
    paragraph:
      "Perasaan kesepian bisa menjadi tantangan serius bagi mahasiswa, terutama selama periode ujian ketika tekanan dan stres meningkat.",
    image: "/images/blog2.jpg",
    author: {
      name: "konselingmakaraui",
      image: "/favicon.ico",
      designation: "Content Writer",
    },
    tags: ["Psychology"],
    publishDate: "2024",
  },
  {
    id: 3,
    title: "Navigasi Sukses Menuju Semester Baru",
    paragraph:
      "Memasuki semester baru bukan hanya soal buku teks dan jadwal kuliah, tetapi juga persiapan diri menuju pencapaian puncak akademis.",
    image: "/images/blog3.png",
    author: {
      name: "konselingmakaraui",
      image: "/favicon.ico",
      designation: "Content Writer",
    },
    tags: ["Motivation"],
    publishDate: "2024",
  },
  {
    id: 4,
    title: "Resolusi Tahun Baru",
    paragraph:
      "Ketika memasuki tahun baru, kita sering sekali mendengar istilah “resolusi tahun baru”, tapi apa sih sebenarnya yang dimaksud resolusi? Sudahkah kita memahaminya dengan baik dan benar? Yuk kita bahas!",
    image: "/images/blog4.png",
    author: {
      name: "konselingmakaraui",
      image: "/favicon.ico",
      designation: "Content Writer",
    },
    tags: ["Motivation"],
    publishDate: "2024",
  }
];
export default blogData;
