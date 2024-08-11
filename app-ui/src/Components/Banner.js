// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Banner = () => {
//   const [visible, setVisible] = useState(false);
//   const [description, setDescription] = useState('');
//   const [timer, setTimer] = useState(0);
//   const [link, setLink] = useState('');
//   const [countdown, setCountdown] = useState(timer);

//   useEffect(() => {
//     // Fetch banner data from the backend
//     axios.get('http://localhost:5000/api/banner')
//       .then(response => {
//         const { description, timer, link } = response.data;
//         setDescription(description);
//         setTimer(timer);
//         setLink(link);
//         setCountdown(timer);
//         setVisible(true);
//       })
//       .catch(error => console.error('Error fetching banner data:', error));

//     // Countdown logic
//     if (visible) {
//       const interval = setInterval(() => {
//         setCountdown(prev => {
//           if (prev <= 1) {
//             setVisible(false);
//             clearInterval(interval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [visible, timer]);

//   if (!visible) return null;

//   return (
//     <div className="banner">
//       <p>{description}</p>
//       <p>{countdown} seconds remaining</p>
//       {link && <a href={link}>Learn more</a>}
//     </div>
//   );
// };

// export default Banner;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';

// const Banner = () => {
//     const [banner, setBanner] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [timeRemaining, setTimeRemaining] = useState(0);
//     const [isVisible, setIsVisible] = useState(true);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/banner')
//             .then(response => {
//                 setBanner(response.data);
//                 setLoading(false);
//                 setTimeRemaining(response.data.timer); // Set initial countdown time
//                 setIsVisible(response.data.visible); // Set initial visibility
//             })
//             .catch(error => {
//                 setError('Error fetching banner data');
//                 setLoading(false);
//             });
//     }, []);

//     useEffect(() => {
//         if (timeRemaining > 0) {
//             const interval = setInterval(() => {
//                 setTimeRemaining(prevTime => {
//                     if (prevTime <= 1) {
//                         clearInterval(interval);
//                         setIsVisible(false); // Hide banner when timer reaches 0
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);

//             return () => clearInterval(interval); // Cleanup interval on component unmount
//         }
//     }, [timeRemaining]);

//     if (loading) {
//         return (
//             <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
//                 <CircularProgress />
//                 <Typography variant="h6" style={{ marginTop: '20px' }}>Loading...</Typography>
//             </Container>
//         );
//     }

//     if (error) {
//         return (
//             <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
//                 <Typography variant="h6" color="error">{error}</Typography>
//             </Container>
//         );
//     }

//     if (!isVisible) {
//         return null; // Don't render anything if the banner is hidden
//     }

//     return (
//         <Container maxWidth="md" style={{ marginTop: '50px' }}>
//             <Card variant="outlined">
//                 <CardContent style={{ textAlign: 'center' }}>
//                     <Typography variant="h4" component="h1" gutterBottom>
//                         {banner.description}
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         href={banner.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{ marginTop: '20px' }}
//                     >
//                         Visit Banner Link
//                     </Button>
//                     <Typography variant="body1" style={{ marginTop: '20px' }}>
//                         {isVisible ? 'Banner is visible' : 'Banner is hidden'}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
//                         Countdown Timer: {formatTime(timeRemaining)}
//                     </Typography>
//                 </CardContent>
//             </Card>
//         </Container>
//     );
// };

// // Helper function to format time in MM:SS format
// const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
// };

// export default Banner;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';

const Banner = ({ bannerData }) => {
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/banner');
                setBanner(response.data);
                setTimeRemaining(response.data.timer);
                setIsVisible(response.data.visible);
                setLoading(false);
            } catch (err) {
                setError('Error fetching banner data');
                setLoading(false);
            }
        };

        if (!bannerData) {
            fetchBanner();
        } else {
            setBanner(bannerData);
            setTimeRemaining(bannerData.timer);
            setIsVisible(bannerData.visible);
            setLoading(false);
        }
    }, [bannerData]);

    useEffect(() => {
        if (timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        setIsVisible(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timeRemaining]);

    if (loading) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '20px' }}>Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Container>
        );
    }

    if (!isVisible) {
        return null;
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <Card variant="outlined">
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {banner.description}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: '20px' }}
                    >
                        Visit Banner Link
                    </Button>
                    <Typography variant="body1" style={{ marginTop: '20px' }}>
                        {isVisible ? 'Banner is visible' : 'Banner is hidden'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                        Countdown Timer: {formatTime(timeRemaining)}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export default Banner;
