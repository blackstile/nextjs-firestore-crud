import React, { useState } from 'react';
import Link from 'next/link';
import db from '../../utils/db';

function ListPost({ posts }) {
  const [entries, setEntries] = useState(posts);

  return (
    <div className="container">
      <h1 className="titulo">Posts</h1>
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex odd:bg-violet-400 my-1 rounded-md odd:text-white even:bg-sky-300"
        >
          <Link passHref href={`/posts/${entry.slug}`}>
            <a className="flex-grow py-2 px-4 text-lg hover:opacity-95 hover:underline">
              {entry.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ListPost;

export async function getStaticProps() {
  console.log('revalidate', new Date().toISOString());
  const entries = await db
    .collection('entries')
    .orderBy('created', 'desc')
    .get();
  const posts = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));
  return {
    props: { posts },
    revalidate: 30,
  };
}
