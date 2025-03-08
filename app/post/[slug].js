import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((file) => ({
    params: { slug: file.replace(".md", "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join("posts", `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { props: { title: data.title, date: data.date, content: contentHtml } };
}

export default function Post({ title, date, content }) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500">{date}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
