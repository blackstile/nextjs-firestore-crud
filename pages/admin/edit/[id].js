import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function EditPost({ id }) {
  const router = useRouter();
  const [entry, setEntry] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    async function fetchPostData() {
      const post = await axios
        .get(`/api/entry/${id}`)
        .then((res) => res.data)
        .then((data) => data.post);
      setEntry(post);
    }
    fetchPostData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntry((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDelete = async (id) => {
    axios
      .delete(`/api/entry/${id}`)
      .then(alert('Post Removido com sucesso'))
      .then(() => router.push('/admin/edit'));
  };
  const handleEdit = async (id) => {
    await axios
      .put(`/api/entry/${id}`, entry)
      .then(() => router.push('/admin/edit'));
  };

  return (
    <div className="container">
      <h1 className="titulo">Edit Post</h1>
      <div className="input-group">
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          value={entry.title}
          onChange={handleChange}
          className="input"
          name="title"
          id="title"
        />
      </div>
      <div className="input-group">
        <label htmlFor="body" className="label">
          Body
        </label>
        <textarea
          name="body"
          id="body"
          value={entry.body}
          rows="6"
          className="input"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex">
        <button
          onClick={() => handleEdit(id)}
          className="button flex-grow mx-3 justify-evenly text-white bg-violet-500"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="button flex-grow mx-3 justify-evenly text-white  bg-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default EditPost;

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { id },
  };
}
