'use client'; // Nécessaire pour activer le rendu côté client

import { useEffect, useState } from 'react';

const GuessingGame = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isPWAInstallable, setIsPWAInstallable] = useState(false);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 10) + 1);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsPWAInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installée avec succès !');
            } else {
                console.log('Installation de la PWA annulée.');
            }
            setDeferredPrompt(null);
        }
    };

    const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(e.target.value);
    };

    const handleGuessSubmit = () => {
        const userGuess = parseInt(guess, 10);
        if (userGuess === numberToGuess) {
            setMessage('Bravo ! Vous avez deviné le bon nombre !');
            setNumberToGuess(Math.floor(Math.random() * 10) + 1); // Génère un nouveau nombre à deviner
        } else {
            setMessage('Dommage, essayez encore !');
        }
        setGuess('');
    };

    if (!isPWAInstallable) {
        return (
            <div>
                <h1>Jeu de devinettes</h1>
                <input
                    type="number"
                    value={guess}
                    onChange={handleGuessChange}
                    placeholder="Devinez un nombre entre 1 et 10"
                    className="p-2 border rounded"
                />
                <button onClick={handleGuessSubmit} className="p-2 bg-blue-500 text-white rounded">
                    Deviner
                </button>
                <p>{message}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Jeu de devinettes</h1>
            <input
                type="number"
                value={guess}
                onChange={handleGuessChange}
                placeholder="Devinez un nombre entre 1 et 10"
                className="p-2 border rounded"
            />
            <button onClick={handleGuessSubmit} className="p-2 bg-blue-500 text-white rounded">
                Deviner
            </button>
            <p>{message}</p>
            <button onClick={handleInstallClick} className="p-2 bg-green-500 text-white rounded">
                Installer la PWA
            </button>
        </div>
    );
};

export default GuessingGame;
