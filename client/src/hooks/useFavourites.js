import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFavourites = (setChecked,checked) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState()
  const token = localStorage.getItem('token');

  useEffect(() => {
    get_favorites()
  }, [checked])

  const get_favorites = async (filters) => {
    setLoading(true);
    setError(null);

    let url = "http://localhost:5000/api/users/favorites";

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
        setFavorites(data.response)
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const create_favorites = async (id,setChecked,checked) => {
    setLoading(true);
    setError(null);
    return fetch(`http://localhost:5000/api/users/favorites/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        response.json();
      })
      .then(data => {
        setChecked(!checked)
        toast.success("New favourites created!!!");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const delete_favorites = async (id) => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/api/users/favorites/delete/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        get_favorites()
        toast.success("Listing deleted!!!");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    favorites,
    create_favorites,
    get_favorites,
    delete_favorites
  };
};

export default useFavourites;