import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import spinner from "../assets/Loading.json"

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
        "https://bakeverse-bk.vercel.app/auth/set-cookie",
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
        <Lottie
          animationData={spinner}
          loop={true}
          style={{ height: 90, width: 90 }}
        />
      </div>
    </>
  );
};

export default OAuthSuccess;
