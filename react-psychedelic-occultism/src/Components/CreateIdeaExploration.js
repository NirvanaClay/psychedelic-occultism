import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateIdeaExploration = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className='create-summary'>
      <h1>Create New Idea Exploration</h1>
      <form>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder='Content'
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
        <button type='submit'>Create Idea Exploration</button>
      </form>
    </div>
  );
};

export default CreateIdeaExploration;
