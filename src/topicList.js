import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import './topicList.css';
import 'react-quill/dist/quill.snow.css';

function TopicList({ topics, onDeleteTopic }) {
  const [openEditorId, setOpenEditorId] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicLikes, setTopicLikes] = useState({});

  const handleDelete = (id) => {
    onDeleteTopic(id);
  };

  const handleWriteClick = (id) => {
    setOpenEditorId(id);
  };

  const handleCloseEditor = () => {
    setOpenEditorId(null);
    setEditorContent('');
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleSave = () => {
    const element = document.createElement('a');
    const file = new Blob([editorContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'blog_content.txt';
    document.body.appendChild(element);
    element.click();
    handleCloseEditor();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderKeywords = (keywords) => {
    return keywords.map((keyword, index) => (
      <span
        key={index}
        className="keyword"
        style={{ backgroundColor: `#${getRandomColor()}` }}
      >
        {keyword}
      </span>
    ));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTopics = topics.filter((topic) =>
    topic.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleLikeClick = (id) => {
    setTopicLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

  return (
    <div className="topic-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search keywords..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {filteredTopics.map((topic) => (
        <div key={topic.id} className="topic-item">
          <div className="topic-row">
            <div className="topic-title-wrapper">
              <h2 className="topic-title">{topic.name}</h2>
            </div>
            <div className="button-wrapper">
              <button
                className="button1 delete-button"
                title="Click here to make this box disappear forever!"
                onClick={() => handleDelete(topic.id)}
              >
                Delete
              </button>
              <button
                className="button1 write-button"
                title="Click here to explore and describe in detail!"
                onClick={() => handleWriteClick(topic.id)}
              >
                Write
              </button>
              <span
                className="like-button"
                title="Click here to like this topic!"
                onClick={() => handleLikeClick(topic.id)}
              >
                ❤️
              </span>
              <span className="like-count">{topicLikes[topic.id] || 0}</span>
            </div>
          </div>
          <div className="topic-keywords">{renderKeywords(topic.keywords)}</div>
          {openEditorId === topic.id && (
            <div className="blog-editor">
              <h3>Blog Editor</h3>
              <ReactQuill value={editorContent} onChange={handleEditorChange} />
              <div className="editor-buttons">
                <button className="button2 save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="button2 cancel-button" onClick={handleCloseEditor}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TopicList;
