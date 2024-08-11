// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';

// const Dashboard = () => {
//     const [description, setDescription] = useState('');
//     const [timer, setTimer] = useState(0);
//     const [link, setLink] = useState('');
//     const [visible, setVisible] = useState(true);
//     const [banner, setBanner] = useState(null);

//     useEffect(() => {
//         // Fetch the current banner settings
//         axios.get('http://localhost:5000/api/banner')
//             .then(response => {
//                 const { description, timer, link, visible } = response.data;
//                 setDescription(description);
//                 setTimer(timer);
//                 setLink(link);
//                 setVisible(visible);
//                 setBanner(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching banner data', error);
//             });
//     }, []);

//     // const handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     axios.put('http://localhost:5000/api/banner', { description, timer, link, visible })
//     //         .then(response => {
//     //             setBanner(response.data); // Update local state with the new banner data
//     //             alert('Banner settings updated'); // Notify user
//     //         })
//     //         .catch(error => {
//     //             console.error('Error updating banner data', error);
//     //         });
//     // };

//     const handleSubmit = async (event) => {
//         console.log("Button Clicked");
//         event.preventDefault();
//         try {
//             console.log('Sending PUT request to backend');
//             const response = await axios.put('http://localhost:5000/api/banner', { description, timer, link, visible });
//             console.log('Received response:', response.data);
//             setBanner(response.data); // Update local state with the new banner data
//             alert('Banner settings updated, Please Refresh'); // Notify user
//         } catch (error) {
//             console.error('Error updating banner data', error);
//         }
//     };
    
//     return (
//         <Container maxWidth="sm">
//             <Typography variant="h5" gutterBottom>Update Banner Settings</Typography>
//             <form onSubmit={handleSubmit} >
//                 <TextField
//                     label="Description"
//                     fullWidth
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Timer (seconds)"
//                     type="number"
//                     fullWidth
//                     value={timer}
//                     onChange={(e) => setTimer(Number(e.target.value))}
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Link"
//                     fullWidth
//                     value={link}
//                     onChange={(e) => setLink(e.target.value)}
//                     margin="normal"
//                 />
//                 <FormControlLabel
//                     control={<Checkbox checked={visible} onChange={() => setVisible(!visible)} />}
//                     label="Show Banner"
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     style={{ marginTop: '20px' }}
//                 >
//                     Save Settings
//                 </Button>
//             </form>
//         </Container>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the current banner settings
        const fetchBannerSettings = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/banner');
                const { description, timer, link, visible } = response.data;
                setDescription(description);
                setTimer(timer);
                setLink(link);
                setVisible(visible);
            } catch (err) {
                console.error('Error fetching banner settings:', err);
                setError('Failed to load banner settings');
            } finally {
                setLoading(false);
            }
        };

        fetchBannerSettings();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put('http://localhost:5000/api/banner', {
                id: 1, // Assuming we are always updating the banner with id 1
                description,
                timer,
                link,
                visible
            });
            alert('Banner settings updated successfully!');
            console.log('Banner updated:', response.data);
        } catch (err) {
            console.error('Error updating banner settings:', err);
            setError('Failed to update banner settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>Update Banner Settings</Typography>
            {loading && <Typography variant="body1">Loading...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Timer (seconds)"
                    type="number"
                    fullWidth
                    value={timer}
                    onChange={(e) => setTimer(Number(e.target.value))}
                    margin="normal"
                />
                <TextField
                    label="Link"
                    fullWidth
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={visible}
                            onChange={() => setVisible(!visible)}
                        />
                    }
                    label="Show Banner"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: '20px' }}
                    disabled={loading}
                >
                    Save Settings
                </Button>
            </form>
        </Container>
    );
};

export default Dashboard;
