import { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export const useLogin = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (user.length !== 0) {
          const request = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );
          setProfile(request.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getInfo();
  }, [user]);

  return {
    login,
    user,
    profile,
  };
};

export const useInfoBookId = (id) => {
  const [book, setBook] = useState("");

  useEffect(() => {
    const getBook = async () => {
      const bookInfo = await axios.get(`http://localhost:8000/books/${id}/`);
      setBook(bookInfo.data);
    };
    getBook();
  }, []);
  return { book };
};

export const useInfoBook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get("http://localhost:8000/books/");
      setBook(res.data);
    };

    getBook();
  }, []);

  return { book };
};

export const useInfoUser = () => {
  const [infoUser, setInfoUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:8000/users/");
      setInfoUser(res.data);
    };

    getUser();
  }, []);

  return { infoUser };
};

export const useInfoUserId = (id) => {
  const [infoUserId, setInfoUserId] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`http://localhost:8000/users/${id}/`);
      setInfoUserId(res.data);
    };
    getUser();
  }, []);
  console.log(infoUserId);
  return { infoUserId };
};

export const useInfoGenre = () => {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      const resGenre = await axios.get("http://localhost:8000/genre/");
      setGenre(resGenre.data);
    };

    getGenre();
  }, []);

  return { genre };
};

export const useGenres = () => {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      const resGenre = await axios.get("http://localhost:8000/maingenre/");
      setGenre(resGenre.data);
    };

    getGenre();
  }, []);

  return { genre };
};
