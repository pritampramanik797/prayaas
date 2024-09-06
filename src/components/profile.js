import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [activeSection, setActiveSection] = useState("realtime"); // Default to Real-time footage

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

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div style={{ display: "flex", fontFamily: "'Poppins', sans-serif" }}>
      {/* Sidebar with glass effect */}
      <div
        style={{
          width: "250px",
          height: "calc(100vh - 80px)", // Adjusting height so it doesn't affect the navbar
          background: "rgba(255, 255, 255, 0.1)", // Glass effect
          backdropFilter: "blur(10px)",
          padding: "20px",
          position: "fixed",
          top: "80px", // Ensures it appears just below the navbar
          left: "20px",
          borderRadius: "15px", // Rounded corners
          color: "black",
          display: "flex",
          flexDirection: "column",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
          zIndex: 10, // Elevate the sidebar
          justifyContent: "space-between", // Space out elements
        }}
      >
        <div>
          {/* Sidebar Heading */}
          <h1
            style={{
              fontSize: "20px",
              color: "black", // Black for Dashboard heading
              textAlign: "left",
              marginBottom: "20px",
              fontWeight: "bold", // Bold style for heading
            }}
          >
            Dashboard
          </h1>

          <button
            className="btn mb-3"
            style={{
              color: "black", // Black color for buttons
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "15px",
              textAlign: "left",
              fontSize: "16px",
              backgroundColor: "transparent", // No background color
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={() => setActiveSection("realtime")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#8a2be2";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "black";
            }}
          >
            Real-time Footage
          </button>

          <button
            className="btn"
            style={{
              color: "black", // Black color for buttons
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "16px",
              backgroundColor: "transparent", // No background color
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onClick={() => setActiveSection("analytics")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#8a2be2";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "black";
            }}
          >
            Analytics
          </button>
        </div>

        <div
          style={{
            paddingBottom: "20px", // Adding some padding at the bottom
          }}
        >
          <p style={{ textAlign: "center", color: "#eee" }}>Footer Info</p>
        </div>
      </div>

      <div style={{ marginLeft: "290px", width: "100%" }}>
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg fixed-top w-100"
          style={{ backgroundColor: "#8a2be2" }} // Violet navbar
        >
          <div className="container-fluid">
            {/* Prayaas as Navbar Title */}
            <a className="navbar-brand" href="#" style={{ color: "white" }}>
              Prayaas
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

              {/* Hello message and Logout button */}
              {userDetails && (
                <span className="navbar-text me-3" style={{ color: "white" }}>
                  Hello, {userDetails.firstName}
                </span>
              )}
              <button
                className="btn btn-outline-danger"
                style={{
                  color: "white", // White text color for logout button before hover
                  border: "2px solid white", // White border before hover
                  backgroundColor: "transparent", // Transparent background before hover
                }}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "red";
                  e.target.style.color = "white"; // Ensure text stays white on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white"; // Keep text color white when not hovered
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div style={{ padding: "100px 20px", color: "#333" }}>
          {activeSection === "realtime" && (
            <div>
              <h2>Real-time Footage</h2>
              <p>Webcam footage will be displayed here.</p>
              {/* Add real-time webcam component here */}
            </div>
          )}

          {activeSection === "analytics" && (
            <div>
              <h2>Analytics</h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#8a2be2", color: "white" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Serial No.
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Location
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Date
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Time
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Number of Alerts
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      1
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Park Street
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      2024-09-05
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      10:30 AM
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      5
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      2
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Salt Lake
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      2024-09-05
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      11:00 AM
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      8
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      3
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      New Town
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      2024-09-05
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      11:30 AM
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      7
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      4
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Esplanade
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      2024-09-05
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      12:00 PM
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      4
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      5
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      Howrah
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      2024-09-05
                    </td>
                      12:30 PM
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      6
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
