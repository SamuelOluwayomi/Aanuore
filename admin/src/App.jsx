import React, { useState, useEffect } from 'react';
import LockScreen from './components/LockScreen';
import StudioHeader from './components/StudioHeader';
import UploadZone from './components/UploadZone';
import PhotoGrid from './components/PhotoGrid';
import SettingsModal from './components/SettingsModal';
import { validateSession, destroySession } from './services/security';
import { adminStore } from './services/adminStore';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => validateSession());
  const [images, setImages] = useState(() => adminStore.getImages());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = adminStore.subscribe((updatedImages) => {
      setImages(updatedImages);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    destroySession();
    setIsAuthenticated(false);
  };

  const handleExportBackup = () => {
    adminStore.exportBackup();
  };

  if (!isAuthenticated) {
    return <LockScreen onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#ede9df] text-ink flex flex-col antialiased selection:bg-accent-purple selection:text-white">
      
      {/* Top Studio Navbar */}
      <StudioHeader 
        photoCount={images.length}
        onOpenSettings={() => setShowSettings(true)}
        onLogout={handleLogout}
        onExportBackup={handleExportBackup}
      />

      {/* Main Studio Body */}
      <main className="max-w-[1400px] mx-auto w-full p-4 sm:p-8 flex-1 relative">
        
        {/* Decorative Top-Right Sparkle */}
        <div className="absolute top-6 right-8 pointer-events-none opacity-30 hidden lg:block">
          <img src="/sparkles.svg" alt="" className="w-12 h-12" />
        </div>

        {/* Top Upload Zone */}
        <UploadZone onUploadComplete={() => setImages(adminStore.getImages())} />

        {/* Photo Sequence Grid */}
        <PhotoGrid images={images} />

      </main>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* Footer Meta */}
      <footer className="py-6 border-t-2 border-black/10 bg-[#ede9df] text-center text-xs text-ink-muted">
        <span>Aanuore Studio Admin • Private Isolated Workspace</span>
      </footer>

    </div>
  );
}
