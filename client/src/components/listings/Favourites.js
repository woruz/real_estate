import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import AddListingModal from './AddListingModal';
import "./AddListingModal.css"
import "./Listings.css"
import useFavourites from '../../hooks/useFavourites';

const Favourites = () => {
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const [oldTitle, setOldTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    type: ''
  });

  const {favorites,loading,error,delete_favorites} = useFavourites()

  useEffect(() => {
    setListings(favorites)
    setFilteredListings(favorites);
  }, [favorites]);

//   useEffect(() => {
//     get_listing()
//   }, [oldTitle])

  const handleAddListing = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleCheckbox = (id) => {
    
  };

  const handleDeleteListing = (id) => {
    delete_favorites(id)
  }

  const handleSearch = () => {
    console.log({filterOptions})
    // get_listing(filterOptions);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterOptions({
      location: '',
      minPrice: '',
      maxPrice: '',
      type: ''
    });
    // Fetch listings without filters
    // get_listing();
  };

  return (
    <div className='listing-top'>
      <h2>Personal Favourites</h2>
      <div className="add-button-container">
      </div>
      <div className="list-main-div">
        {listings && listings.length ?  listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <div className='listing-main'>
              <Link className='link-minor-details' to={`/listings/${listing._id}`}>
                <h3>{listing.title}</h3>
                <p>Location: {listing.location}</p>
              </Link>

              <div className="listing-header">
                <h4>Favourites</h4>
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleToggleCheckbox(listing._id)}
                />
              </div>
            </div>
            <div className="listing-footer">
              <button className="contact-button">Contact Owner</button>
              <button className="contact-button" onClick={() => handleDeleteListing(listing._id)}>Delete Listing</button>
            </div>
          </div>
        )) : ""}
      </div>
    </div>
  );
};

export default Favourites;