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
