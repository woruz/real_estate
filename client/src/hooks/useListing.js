import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useListing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState()
  const token = localStorage.getItem('token');

  useEffect(() => {
    get_listing()
  }, [])

  const get_listing = async (filters) => {
    setLoading(true);
    setError(null);

    let url = "http://localhost:5000/api/listings";

    // Apply filters if provided
    if (filters) {
      const { location, minPrice, maxPrice, type } = filters;
      const params = new URLSearchParams({
        location,
        minPrice,
        maxPrice,
        type
        // Add more filters as needed
      });
      url += `?${params}`;
    }
    fetch(url, {
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        console.log({response})
        return response.json();
      })
      .then((data) => {
        console.log({dataimp123: data})
        setData(data.response)
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const get_listing_by_id = async (id,setListing) => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/listings/particular/${id}`, {
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        console.log({response})
        return response.json();
      })
      .then((data) => {
        setListing(data.response)
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const create_listing = async (body) => {
    setLoading(true);
    setError(null);
    console.log({body})
    fetch("http://localhost:5000/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        response.json();
      })
      .then(data => {
        toast.success("New listing created!!!");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const delete_listing = async (id) => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/listings/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        toast.success("Listing deleted!!!");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        window.location.reload()
      });
  };

  const update_listing = async (id,body,setListing) => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/listings/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success("Success")
        get_listing_by_id(id,setListing)

      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    data,
    create_listing,
    delete_listing,
    get_listing_by_id,
    update_listing,
    get_listing
  };
};

export default useListing;