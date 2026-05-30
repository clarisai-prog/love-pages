import { useState } from 'react';
import SceneConvite from './scenes/SceneConvite';
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
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <div className="relative">
      {/* Noise texture overlay */}
      <NoiseOverlay />

      {/* Capítulo 1: O Convite */}
      {!entered && <SceneConvite onEnter={handleEnter} />}

      {/* Main Content - aparece após o convite ser aceito */}
      {entered && (
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
