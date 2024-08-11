// import React from 'react';
// import Banner from '../src/Components/Banner';
// import Dashboard from '../src/Components/Dashboard';

// const App = () => {
//   return (
//     <div className="App">
//       <Banner />
//       <Dashboard />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import Banner from '../src/Components/Banner';
import Dashboard from '../src/Components/Dashboard';

function App() {
    const [bannerData, setBannerData] = useState(null);

    const handleBannerUpdate = (updatedBanner) => {
        setBannerData(updatedBanner);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 2 }}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Dynamic Banner Website
                </Typography>
                <Banner bannerData={bannerData} />
                <Dashboard onBannerUpdate={handleBannerUpdate} />
            </Container>
        </Box>
    );
}

export default App;

