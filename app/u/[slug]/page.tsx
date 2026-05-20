import { Metadata } from "next";
import { FaStar, FaArrowDown, FaBriefcase } from "react-icons/fa6";

// Define the Next 15+ Params Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// ==========================================
// 1. DATA FETCHING FUNCTION
// ==========================================
async function getProfile(slug: string) {
  try {
    // 🚨 IMPORTANT: Change this to your production backend URL when you deploy!
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.19.26:5000";
    
    // Fetching the profile using the exact endpoint we built in Phase 1
    const res = await fetch(`${backendUrl}/profile/slug/${slug}`, {
      next: { revalidate: 60 }, // Cache the profile for 60 seconds for insane speed
    });
    
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Failed to fetch profile for fallback:", error);
    return null;
  }
}

// ==========================================
// 2. SOCIAL MEDIA PREVIEW MAGIC (OPEN GRAPH)
// ==========================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const profile = await getProfile(resolvedParams.slug);

  if (!profile) {
    return { title: "Expert Not Found | YB Connect" };
  }

  // Extract clean data
  const name = profile.user?.name || profile.name || "YB Connect Expert";
  const designation = profile.designation || "Professional";
  const company = profile.companyName ? `at ${profile.companyName}` : "";
  const imageUrl = profile.profileImage !== "default-avatar.png" 
    ? profile.profileImage 
    : "https://ybconnect.in/img/yash.png"; // Use your default logo here

  return {
    title: `${name} | YB Connect`,
    description: `Book a 1:1 session with ${name}, ${designation} ${company}.`,
    openGraph: {
      title: `${name} is on YB Connect`,
      description: `Book a 1:1 mentorship session with ${name}. Get expert guidance, resume reviews, and career growth strategies.`,
      url: `https://ybconnect.in/u/${resolvedParams.slug}`,
      siteName: "YB Connect",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${name} Profile Picture`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `Connect with ${name} on YB Connect`,
      description: `Book a 1:1 mentorship session with ${name}.`,
      images: [imageUrl],
    },
  };
}

// ==========================================
// 3. THE PREMIUM UI FALLBACK
// ==========================================
export default async function ExpertFallbackPage({ params }: Props) {
  const resolvedParams = await params;
  const profile = await getProfile(resolvedParams.slug);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#05060A] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold text-[#FACC15] mb-4">Profile Not Found</h1>
        <p className="text-[#94A3B8]">The expert link you clicked might be broken or expired.</p>
        <a href="/" className="mt-8 px-6 py-3 bg-[#1E293B] rounded-full text-sm font-bold">Go to Homepage</a>
      </div>
    );
  }

  // Extract clean data for UI
  const name = profile.user?.name || profile.name;
  const designation = profile.designation || "Expert";
  const company = profile.companyName ? `at ${profile.companyName}` : "";
  const imageUrl = profile.profileImage !== "default-avatar.png" ? profile.profileImage : "/img/yash.png";
  
  // 🚨 THE MAGIC DEEP LINK URL
  const appDeepLink = `mobile://u/${resolvedParams.slug}`;

  return (
    <div className="min-h-screen bg-[#05060A] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Glow matching your homepage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(250,204,21,0.1)_0%,rgba(5,6,10,0)_70%)] pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        {/* YB Connect Branding */}
        <div className="text-[#FACC15] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-2">
          <FaStar className="animate-pulse" /> YB CONNECT EXPERT
        </div>

        {/* Profile Card */}
        <div className="w-full bg-[rgba(10,14,23,0.8)] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Glowing Avatar */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#FACC15] rounded-full blur-[20px] opacity-20"></div>
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-32 h-32 rounded-full object-cover border-[4px] border-[#1E293B] relative z-10"
            />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
          <p className="text-[#FACC15] font-medium flex items-center gap-2 mb-4">
            <FaBriefcase className="text-sm" /> {designation} {company}
          </p>

          <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 line-clamp-3">
            {profile.bio || `Connect with ${name} for a dedicated 1-on-1 session on YB Connect.`}
          </p>

          {/* 🚨 THE DEEP LINK BUTTON */}
          <a 
            href={appDeepLink} 
            className="w-full bg-[#FACC15] text-black py-4 rounded-2xl font-bold hover:bg-[#EAB308] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-[15px] shadow-[0_0_20px_rgba(250,204,21,0.4)]"
          >
            Open in App to Book <FaArrowDown />
          </a>

          <p className="text-xs text-gray-500 mt-4">
            Don't have the app? <a href="#" className="text-white underline">Download here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
