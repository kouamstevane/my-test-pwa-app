"use client";

import { useEffect } from "react";

export default function ServiceWorkerManager() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Le nouveau Service Worker enregistré :", registration);
        })
        .catch((error) => {
          console.error("Erreur d'enregistrement du Service Worker :", error);
        });
    }
  }, []);

  return null; // Pas de rendu UI
}
