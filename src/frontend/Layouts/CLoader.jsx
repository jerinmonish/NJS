const CLoader = () => {
  //other logic
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
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          {/* <span class="visually-hidden">Loading...</span> */}
        </div>
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

export default CLoader