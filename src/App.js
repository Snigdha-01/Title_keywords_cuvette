
import React, { useState } from 'react';
import TopicList from './topicList';
import AddTopicForm from './addTopicForm';
import './App.css';

function App() {
  const [topics, setTopics] = useState([]);

  const handleAddTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };

  const handleDeleteTopic = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">
        <span style={{ "--index": "1" }}>D</span>
        <span style={{ "--index": "2" }}>i</span>
        <span style={{ "--index": "3" }}>s</span>
        <span style={{ "--index": "4" }}>c</span>
        <span style={{ "--index": "5" }}>o</span>
        <span style={{ "--index": "6" }}>v</span>
        <span style={{ "--index": "7" }}>e</span>
        <span style={{ "--index": "8" }}>r</span>
        &nbsp;Exciting Topics
      </h1>

      <TopicList topics={topics} onDeleteTopic={handleDeleteTopic} />
      <AddTopicForm onAddTopic={handleAddTopic} />
    </div>
  );
}

export default App;

