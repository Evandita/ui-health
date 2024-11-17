const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      href={href}
      className="bg-gray-light mb-3 mr-3 inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm text-black duration-300 hover:bg-yellow_bright hover:text-dark dark:bg-[#2C303B] dark:text-white dark:hover:bg-yellow_bright dark:hover:text-dark"
    >
      {text}
    </a>
  );
};

export default TagButton;
