import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';


export default function Loader() {
  const parentOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    background: "#666",
    opacity: 0.8,
    zIndex: 998,
    height: '100%',
    width: '100%',
  };

  const overlayBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    background: '#666666',
    opacity: .8,
    zIndex: 1000,
  }
  return (
    <div style={parentOverlay} width="100%">
      <div style={overlayBox}>
        <CircularProgress style={{ color: '#FF3F8A', width: '100', height: '100' }} />
        {/* <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        /> */}
      </div>
    </div>
  );
}