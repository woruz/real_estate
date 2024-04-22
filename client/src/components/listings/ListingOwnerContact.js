import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import "./AddListingModal.css"
import useListing from '../../hooks/useListing';
// import axios from 'axios';

// Modal.setAppElement('#root');

const ListingOwnerContact = ({ isOpen, onClose, setOldTitle, contactId }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const {create_contact} = useListing()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      create_contact(contactId, {email,phone})
      // Clear form after successful submission
      setEmail('');
      setPhone('');
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
        <h2>Contact Details</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => {
              setOldTitle(e.target.value)
              setEmail(e.target.value)
            }} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ListingOwnerContact;