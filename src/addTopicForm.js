
import React, { useState } from 'react';
import Modal from 'react-modal';

function AddTopicForm({ onAddTopic }) {
    const [showModal, setShowModal] = useState(false);
    const [topicName, setTopicName] = useState('');
    const [keywords, setKeywords] = useState('');

    const handleAddTopic = () => {
        setShowModal(true);
    };

    const handleSaveTopic = () => {
        if (topicName && keywords) {
            const newTopic = {
                id: Date.now(),
                name: topicName,
                keywords: keywords.split(',').map((keyword) => keyword.trim()),
            };
            onAddTopic(newTopic);
            setShowModal(false);
            setTopicName('');
            setKeywords('');
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setTopicName('');
        setKeywords('');
    };

    const customModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            maxWidth: '400px',
            width: '90%',
            margin: 'auto',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%)',
        },
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    className="add-topic-button"
                    onClick={handleAddTopic}
                    style={{
                        background: 'transparent',
                        color: '#af4c4c',
                        padding: '10px 60px',
                        borderRadius: '4px',
                        border: '2px solid #af4c4c',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Add topic
                </button>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCancel}
                contentLabel="Add Topic Modal"
                style={customModalStyles}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Topic</h2>
                <form>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="topicName">Topic Name:</label>
                        <input
                            type="text"
                            id="topicName"
                            value={topicName}
                            onChange={(e) => setTopicName(e.target.value)}
                            placeholder="Enter topic name"
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="keywords">Keywords:</label>
                        <input
                            type="text"
                            id="keywords"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Enter keywords (comma-separated)"
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            className="save-button"
                            onClick={handleSaveTopic}
                            style={{ background: '#4caf50', color: '#fff', padding: '10px 20px', borderRadius: '4px', border: 'none', marginRight: '10px' }}
                        >
                            Save
                        </button>
                        <button
                            className="cancel-button"
                            onClick={handleCancel}
                            style={{ background: '#f44336', color: '#fff', padding: '10px 20px', borderRadius: '4px', border: 'none' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AddTopicForm;
