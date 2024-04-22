import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import UpdateListingModal from "./UpdateListingModal";
import useListing from "../../hooks/useListing";

const ListingDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listing, setListing] = useState(null);
  const { get_listing_by_id } = useListing();

  useEffect(() => {
    get_listing_by_id(id, setListing);
  }, [id]);

  const handleAddListing = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!listing) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add New Estate Modal"
        style={modalStyles}
      >
        <UpdateListingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          id={listing._id}
          old_title={listing.title}
          old_type={listing.type}
          old_price={listing.price}
          old_description={listing.description}
          old_location={listing.location}
          setListing={setListing}
        />
      </Modal>
      <h2 style={styles.heading}>{listing.title}</h2>
      <p style={styles.text}>Type: {listing.type}</p>
      <p style={styles.text}>Price: {listing.price}</p>
      <p style={styles.text}>Location: {listing.location}</p>
      <p style={styles.text}>Description: {listing.description}</p>
      <button style={styles.button} onClick={handleAddListing}>
        Edit Listing
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333",
  },
  text: {
    fontSize: "16px",
    marginBottom: "5px",
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },
};

export default ListingDetails;
