import React, { useState } from 'react';
import '../Styles/experienceShare.css'; // Custom styles

const ShareExperience = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Dreams');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [privacy, setPrivacy] = useState('Public');

  const categories = ['Dreams', 'Meditation', 'Manifestation', 'Psychedelics', 'Other Experiences'];
  const privacyOptions = ['Public', 'Members Only', 'Friends Only', 'Anonymous'];

  const handleTagAdd = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const experienceData = {
      title,
      content,
      category,
      tags,
      privacy,
    };

    try {
      const response = await fetch('http://localhost:3001/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experienceData),
      });

      if (response.ok) {
        alert('Experience shared successfully!');
        setTitle('');
        setContent('');
        setCategory('Dreams');
        setTags([]);
        setPrivacy('Public');
      } else {
        alert('Failed to share your experience. Please try again.');
      }
    } catch (error) {
      console.error('Error sharing experience:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="share-experience">
      <h1>Share Your Experience</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        {/* Content */}
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your experience in detail"
            rows="6"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <div className="tags-input">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
            <button type="button" onClick={handleTagAdd}>Add Tag</button>
          </div>
          <div className="tags-list">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)}>x</button>
              </span>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="form-group">
          <label htmlFor="privacy">Privacy</label>
          <select
            id="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
          >
            {privacyOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Share Experience</button>
      </form>
    </div>
  );
};

export default ShareExperience;
