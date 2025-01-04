'use client'; // Nécessaire pour activer le rendu côté client

import { useEffect, useState } from 'react';

const InstallPWAButton = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isPWAInstallable, setIsPWAInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault(); // Empêche l'affichage automatique du popup
            setDeferredPrompt(e); // Enregistre l'événement
            setIsPWAInstallable(true); // Permet d'afficher le bouton
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Affiche le popup d'installation
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installée avec succès !');
            } else {
                console.log('Installation de la PWA annulée.');
            }
            setDeferredPrompt(null); // Réinitialise l'événement
        }
    };

    if (!isPWAInstallable) {
        return null; // Pas affiché si l'application n'est pas installable
    }

    return (
        <button
            onClick={handleInstallClick}
            className="p-2 bg-blue-500 text-red rounded"
        >
            Installer la PWA
        </button>
    );
};

export default InstallPWAButton;
