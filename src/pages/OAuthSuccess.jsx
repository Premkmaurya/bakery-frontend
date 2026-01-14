import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post(
        "https://bakery-backend-two.vercel.app/auth/set-cookie",
        { token },
        { withCredentials: true }
      )
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <lottie-player
          src="./Loading.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style="width:120px; height:120px;"
        ></lottie-player>
      </div>
    </>
  );
};

export default OAuthSuccess;
