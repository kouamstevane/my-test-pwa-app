//import Image from "next/image";
import GuessingGame from "@/components/GuessingGame";
import styles from "./page.module.css";
// import InstallPWAButton from "@/components/InstallPWAButton";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <main className={styles.main}>
      <h1 className="text-3xl font-bold">Bienvenue dans ma PWA !</h1>
      <InstallPWAButton />
      </main> */}
      
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">Bienvenue dans ma PWA Stevane !</h1>
            {/* <InstallPWAButton /> */}
            <GuessingGame />
        </main>
    </div>
  );
}
