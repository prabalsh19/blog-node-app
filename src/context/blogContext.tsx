import { createContext, useContext } from "react";

type BlogContextType = {
  blogs: [];
};

const BlogContext = createContext<BlogContextType | null>(null);

export const BlogContextProviver = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = {
    blogs: [],
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => useContext(BlogContext);
