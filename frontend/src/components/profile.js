import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import RealTimeFootage from "./RealTimeFootage";
import axios from "axios"; // Import axios for API calls
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [activeSection, setActiveSection] = useState("RealTimeFootage"); // Default section
  const [genderResult, setGenderResult] = useState("");
  const [emotionResult, setEmotionResult] = useState("");

  // Set user persistence to LOCAL
  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        fetchUserData(); // Fetch user data after persistence is set
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }, []);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  // Send frame to Flask backend for processing
  const sendFrameToBackend = async (base64Image) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/process_frame", {
        image: base64Image,
      });
      // Extract gender and emotion results from the response
      setGenderResult(response.data.gender);
      setEmotionResult(response.data.emotion);
    } catch (error) {
      console.error("Error processing frame:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundImage: "linear-gradient(135deg, #000000, #4b0082)",
          color: "white",
          width: "100%", // Full width
          position: "fixed",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: "#e0e0e0" }}>
            <b>PRAYAAS</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            {userDetails && (
              <span className="navbar-text me-3" style={{ color: "#e0e0e0" }}>
                Hello, {userDetails.firstName}
              </span>
            )}
            <button
              className="btn btn-outline-light"
              style={{
                borderColor: "white",
                color: "#e0e0e0",
              }}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "red";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            height: "calc(100vh - 70px)", // Sidebar height adjusted
            backgroundImage: "linear-gradient(135deg, #000000, #4b0082)", // Gradient background for sidebar
            padding: "20px",
            position: "fixed",
            top: "60px", // Right below the navbar
            left: "0",
            color: "white",
            display: "flex",
            flexDirection: "column",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            zIndex: "1000",
          }}
        >
          <h3
            style={{
              color: "#e0e0e0", // Lighter color for the heading
              marginBottom: "30px",
              textAlign: "left",
            }}
          >
            Dashboard
          </h3>
          <button
            className="btn mb-3"
            style={{
              backgroundColor: "transparent",
              color: "#dcdcdc", // Text color for sidebar items
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "15px",
              textAlign: "left",
            }}
            onClick={() => setActiveSection("RealTimeFootage")}
          >
            <b>Real-time Footage</b>
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "transparent",
              color: "#dcdcdc", // Text color for sidebar items
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "left",
            }}
            onClick={() => setActiveSection("Analytics")}
          >
            <b>Analytics</b>
          </button>
        </div>

        {/* Main content */}
        <div style={{ marginLeft: "250px", width: "calc(100% - 250px)", padding: "20px", overflow: "hidden" }}>
          {/* Main section */}
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {activeSection === "RealTimeFootage" && (
              <>
                <div
                  style={{
                    position: "relative",
                    height: "500px", // Medium-sized box for video
                    width: "710px", // Aspect ratio maintained
                    background: "#000",
                    borderRadius: "10px",
                    overflow: "hidden",
                    // transform: "scaleX(-1)", // This will flip the video horizontally
                  }}
                >
                  <RealTimeFootage sendFrameToBackend={sendFrameToBackend} />
                </div>

                {/* Gender and Emotion Result Section */}
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                  }}
                >
                  <h4>Gender Detected: {genderResult}</h4>
                  <h4>Emotion Detected: {emotionResult}</h4>
                </div>
              </>
            )}
            {activeSection === "Analytics" && (
              <div style={{ padding: "20px" }}>
                {/* Analytics content goes here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
