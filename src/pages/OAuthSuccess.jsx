import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("OAuth token:", token);
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post("https://bakery-backend-two.vercel.app/auth/set-cookie", { token }, { withCredentials: true })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return <p>Signing you in…</p>;
};

export default OAuthSuccess;
