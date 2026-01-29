"use client";

// import Image from "next/image";
import Image from "../_components/image";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Test() {
  const [confirmExitPrompt, setConfirmExitPrompt] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("Message received:", event);
      // Verify the message origin and type
      //   if (
      //     // event.origin !== "https://mylocaldev.superopsalpha.com:5553" ||
      //     event.data.type !== "parentLocation" ||
      //     event.data.type !== "exitPage"
      //   )
      //     return;

      switch (event.data) {
        case "exitPage":
          setConfirmExitPrompt(true);
          break;
        default:
          window.top.location.href = event.data.home;
          break;
      }
    };

    console.log("useEffect");

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <main className={styles.main}>
      {confirmExitPrompt && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 10,
            border: "1px solid #ccc",
            zIndex: 1000,
            padding: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <p
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            You have unsaved changes.
          </p>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Are you sure you want to exit this page?
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                cursor: "pointer",
                padding: 10,
                borderRadius: 5,
                border: "1px solid #ccc",
                backgroundColor: "green",
              }}
              onClick={() => {
                setConfirmExitPrompt(false);
                window.parent.postMessage("exitPageConfirmed", "*");
              }}
            >
              Yes
            </button>
            <button
              style={{
                cursor: "pointer",
                padding: 10,
                borderRadius: 5,
                border: "1px solid #ccc",
                backgroundColor: "red",
              }}
              onClick={() => {
                setConfirmExitPrompt(false);
                window.parent.postMessage("exitPageCancelled", "*");
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className={styles.description}>
        <p>
          This is a test page&nbsp;
          <code className={styles.code}>app/test/page.js</code>
        </p>
        <p>
          <Link href="/">Home Page</Link>
        </p>
        <p
          onClick={() => {
            window.parent.postMessage("redirectToHome", "*");
          }}
          style={{ cursor: "pointer" }}
        >
          Go to Home Page
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
