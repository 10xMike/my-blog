import { getSortedPosts } from "../lib/posts";

export async function getStaticProps() {
  const posts = getSortedPosts();
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mt-4">
            <a href={`/post/${post.slug}`} className="text-blue-500">
              {post.title}
            </a>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
