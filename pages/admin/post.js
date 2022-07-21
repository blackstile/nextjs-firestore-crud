import { useState, useRef } from 'react';
import axios from 'axios';
import dashify from 'dashify';

export default function Post() {
  const bodyRef = useRef();
  const titleRef = useRef();

  const onSubmit = async () => {
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    console.log('title: ', title, 'body: ', body);
    await axios.post('/api/entry', { title, slug: dashify(title), body });
  };

  return (
    <div className="container">
      <h2 className="titulo">New Post</h2>
      <div className="input-group">
        <label className="label" htmlFor="title">
          Title
        </label>
        <input className="input" type="text" name="title" ref={titleRef} />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="body">
          Body
        </label>
        <textarea
          className="input"
          type="text"
          name="body"
          rows={6}
          ref={bodyRef}
        />
      </div>
      <button onClick={onSubmit} className="button bg-violet-500 text-white">
        Save Post
      </button>
    </div>
  );
}
