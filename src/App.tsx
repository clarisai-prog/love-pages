import { useState, useEffect } from 'react';
import LoadingScreen from './sections/LoadingScreen';
import ValentinePopup from './sections/ValentinePopup';
import OpeningText from './sections/OpeningText';
import PhotoSection from './sections/PhotoSection';
import CinemaTicket from './sections/CinemaTicket';
import MomentsGallery from './sections/MomentsGallery';
import HeartbeatSection from './sections/HeartbeatSection';
import TravelSection from './sections/TravelSection';
import BeforeWeMet from './sections/BeforeWeMet';
import PlaylistSection from './sections/PlaylistSection';
import ThankYouSection from './sections/ThankYouSection';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowPopup(true);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative">
      {/* Noise texture overlay */}
      <NoiseOverlay />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Valentine Popup */}
      {showPopup && !isLoading && (
        <ValentinePopup onClose={handlePopupClose} />
      )}

      {/* Main Content */}
      {!isLoading && (
        <main className="relative">
          <OpeningText />
          <PhotoSection />
          <CinemaTicket />
          <MomentsGallery />
          <HeartbeatSection />
          <TravelSection />
          <BeforeWeMet />
          <PlaylistSection />
          <ThankYouSection />
        </main>
      )}
    </div>
  );
}

export default App;
