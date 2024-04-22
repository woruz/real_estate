import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import "./AddListingModal.css"
import useListing from '../../hooks/useListing';
// import axios from 'axios';

// Modal.setAppElement('#root');

const AddListingModal = ({ isOpen, onClose, setOldTitle }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const {create_listing} = useListing()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      create_listing({title,price,location,description,type})
      // Clear form after successful submission
      setTitle('');
      setPrice('');
      setLocation('');
      setDescription('');
      setType('')
      setOldTitle('')
      // Close the modal
      onClose();
      // Optionally: Show a success message or refresh the listings
    } catch (error) {
      console.error('Error adding new listing:', error);
      // Optionally: Show an error message
    }
  };

  return (
    <>
      <div className="modal-header">
        <h2>Add New Estate</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => {
              setOldTitle(e.target.value)
              setTitle(e.target.value)
            }} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <textarea value={type} onChange={(e) => setType(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Add Estate</button>
        </form>
      </div>
    </>
  );
};

export default AddListingModal;