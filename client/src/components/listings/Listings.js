import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import AddListingModal from './AddListingModal';
import "./AddListingModal.css"
import "./Listings.css"
import useListing from '../../hooks/useListing';
import useFavourites from '../../hooks/useFavourites';
import Favourites from './Favourites';
import ListingOwnerContact from './ListingOwnerContact';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactId, setContactId] = useState('')
  const [filteredListings, setFilteredListings] = useState([]);
  const [oldTitle, setOldTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [checked, setChecked] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    type: ''
  });

  const {data,delete_listing,get_listing} = useListing()
  const {favorites,create_favorites,get_favorites} = useFavourites(setChecked,checked)
  console.log({dataimp: data,favorites,listings})

  useEffect(() => {
    setListings(data)
    setFilteredListings(data);
  }, [data]);

  useEffect(() => {
    get_listing()
  }, [oldTitle])

  const handleAddListing = () => {
    setIsModalOpen(true);
  };

  const handlecontactListing = (id) => {
    setIsContactModalOpen(true);
    setContactId(id)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleToggleCheckbox = (id) => {
    create_favorites(id,setChecked,checked)
  };

  const handleDeleteListing = (id) => {
    delete_listing(id)
  }

  const handleSearch = () => {
    console.log({filterOptions})
    get_listing(filterOptions);
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
    get_listing();
  };

  return (
    <div className='listing-top'>
      <h2>Listings</h2>
      <div className="search-bar">
      <input
          type="text"
          placeholder="Search by location"
          value={filterOptions.location}
          onChange={(e) => setFilterOptions({ ...filterOptions, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min price"
          value={filterOptions.minPrice}
          onChange={(e) => setFilterOptions({ ...filterOptions, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max price"
          value={filterOptions.maxPrice}
          onChange={(e) => setFilterOptions({ ...filterOptions, maxPrice: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={filterOptions.type}
          onChange={(e) => setFilterOptions({ ...filterOptions, type: e.target.value })}
        />
        <button onClick={handleSearch} style={{marginRight: "1rem"}}>Search</button>
        <button onClick={handleResetFilters}>Reset</button>
      </div>
      <div className="add-button-container">
        <button className="add-button" onClick={handleAddListing}>
          Add New Estate
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add New Estate Modal"
      >
        <AddListingModal isOpen={isModalOpen} onClose={handleCloseModal} setOldTitle={setOldTitle} />
      </Modal>
      <Modal
        isOpen={isContactModalOpen}
        onRequestClose={handleCloseContactModal}
        contentLabel="Add New Estate Modal"
      >
        <ListingOwnerContact isOpen={isContactModalOpen} onClose={handleCloseContactModal} setOldTitle={setOldTitle} contactId={contactId} />
      </Modal>
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
                  checked={favorites && favorites.filter(val => val._id == listing._id).length ? true : false}
                  onChange={() => handleToggleCheckbox(listing._id)}
                />
              </div>
            </div>
            <div className="listing-footer">
              <button className="contact-button" onClick={() => handlecontactListing(listing._id)}>Contact Owner</button>
              <button className="contact-button" onClick={() => handleDeleteListing(listing._id)}>Delete Listing</button>
            </div>
          </div>
        )) : ""}
      </div>
    </div>
  );
};

export default Listings;