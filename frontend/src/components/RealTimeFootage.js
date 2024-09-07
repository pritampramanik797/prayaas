import React, { useEffect, useRef, useState } from 'react';

function RealTimeFootage() {
  const videoRef = useRef(null);
  const [avgMale, setAvgMale] = useState(0);
  const [avgFemale, setAvgFemale] = useState(0);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    // Fetch and display the video stream
    videoRef.current.src = 'http://127.0.0.1:5000/video_feed'; // Your Flask server URL

    // Function to fetch the gender ratio
    const fetchAverages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_averages');
        const data = await response.json();
        setAvgMale(data.avg_male);
        setAvgFemale(data.avg_female);
        setRatio(data.ratio);
      } catch (error) {
        console.error('Error fetching averages:', error);
      }
    };

    // Set an interval to fetch the averages every few seconds
    const intervalId = setInterval(fetchAverages, 2000); // Fetch every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          borderRadius: '10px',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      </div>
      <div style={{ marginTop: '20px', color: '#fff' }}>
        <h3>Gender Averages:</h3>
        <p>Average Male: {avgMale}</p>
        <p>Average Female: {avgFemale}</p>
        <p>Male to Female Ratio: {ratio}</p>
      </div>
    </div>
  );
}

export default RealTimeFootage;
