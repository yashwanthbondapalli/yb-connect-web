"use client";

import { FaArrowDown } from "react-icons/fa6";

export default function DeepLinkButton({ slug }: { slug: string }) {
  const handleDeepLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Check what kind of device the user is on
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      // 🚨 FIX: Corrected package to com.ybconnect.app
      // This string forces the app to open. If it fails, it automatically opens the Play Store!
      const androidIntent = `intent://u/${slug}#Intent;scheme=mobile;package=com.ybconnect.app;end;`;
      window.location.href = androidIntent;
    } else if (isIOS) {
      // iOS Safari usually accepts the raw custom scheme
      window.location.href = `mobile://u/${slug}`;
      
      // iOS fallback: If the app doesn't open after 2.5 seconds, trigger an alert or App Store link
      setTimeout(() => {
        alert("Please install the YB Connect app from the App Store.");
        // window.location.href = "https://apps.apple.com/app/idYOUR_APP_ID";
      }, 2500);
    } else {
      // Desktop fallback
      alert("Please open this link on a mobile device with the YB Connect app installed.");
    }
  };

  return (
    <a
      href={`mobile://u/${slug}`}
      onClick={handleDeepLink}
      className="w-full bg-[#FACC15] text-black py-4 rounded-2xl font-bold hover:bg-[#EAB308] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-[15px] shadow-[0_0_20px_rgba(250,204,21,0.4)] cursor-pointer"
    >
      Open in App to Book <FaArrowDown />
    </a>
  );
}
