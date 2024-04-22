import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AddListingModal.css"
import useListing from '../../hooks/useListing';
// import axios from 'axios';

// Modal.setAppElement('#root');

const UpdateListingModal = ({ isOpen, onClose, id, old_title,old_price,old_location,old_description,old_type,setListing }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const {update_listing,delete_listing} = useListing()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   await axios.post('/api/listings', { title, price, location, description });
      // Clear form after successful submission
      setTitle('');
      setPrice('');
      setLocation('');
      setDescription('');
      setType('')
      // Close the modal
      onClose();
      // Optionally: Show a success message or refresh the listings
    } catch (error) {
      console.error('Error adding new listing:', error);
      // Optionally: Show an error message
    }
  };

  const handle_update_listing = () => {
    update_listing(id,{title,price,location,description,type},setListing)
    setTitle('');
    setPrice('');
    setLocation('');
    setDescription('');
    setType('')
  }

  const handle_delete_listing = () => {
    delete_listing(id)
  }

  return (
    <>
      <div className="modal-header">
        <h2>Add New Estate</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title ? title : old_title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="text"
              value={price ? price : old_price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={location ? location : old_location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description ? description : old_description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              value={type ? type : old_type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className='update-listing-button'>
            <button type="submit" className="submit-button" onClick={() => handle_update_listing(id)}>
              Update Estate
            </button>
            <button type="submit" className="submit-button" onClick={handle_delete_listing}>
              Delete Estate
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateListingModal;