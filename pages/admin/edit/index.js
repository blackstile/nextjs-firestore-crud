import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
function ListPost() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/entries');
      setEntries(res.data.entriesData);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <h1 className="titulo">Posts</h1>
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex odd:bg-violet-400 my-1 rounded-md odd:text-white even:bg-sky-300"
        >
          <Link passHref href={`/admin/edit/${entry.id}`}>
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
