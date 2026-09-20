import { Metadata } from "next";
import { FaStar, FaBriefcase, FaArrowDown, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa6";
import DeepLinkButton from "./DeepLinkButton";

// Define the Next 15+ Params Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// ==========================================
// 1. DATA FETCHING FUNCTION
// ==========================================
async function getProfile(slug: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.ybconnect.in";
    
    console.log(`🌐 Fetching expert profile from: ${backendUrl}/api/v1/profile/slug/${slug}`);
    
    const res = await fetch(`${backendUrl}/api/v1/profile/slug/${slug}`, {
      headers: {
        "ngrok-skip-browser-warning": "true" 
      },
      next: { revalidate: 60 }, 
    });
    
    if (!res.ok) {
      console.error(`❌ API responded with status: ${res.status}`);
      return null;
    }
    
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error: any) {
    console.error("Failed to fetch profile for fallback. Error details:", error.message);
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
    : "https://ybconnect.in/img/yash.png"; 

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
// 3. THE PREMIUM PROFESSIONAL UI
// ==========================================
export default async function ExpertFallbackPage({ params }: Props) {
  const resolvedParams = await params;
  const profile = await getProfile(resolvedParams.slug);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-slate-200 mb-4">Profile Not Found</h1>
        <p className="text-slate-400 mb-8">This expert link might be broken or expired.</p>
        <a href="/" className="px-6 py-3 bg-[#1E293B] hover:bg-slate-700 rounded-xl text-sm font-bold transition-all">
          Go to Homepage
        </a>
      </div>
    );
  }

  // Extract clean data for UI
  const name = profile.user?.name || profile.name;
  const designation = profile.designation || "Expert";
  const company = profile.companyName ? `at ${profile.companyName}` : "";
  const imageUrl = profile.profileImage !== "default-avatar.png" ? profile.profileImage : "/img/yash.png";
  const city = profile.city || "Remote";

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Ambient Background Glow (Subtle Purple/Blue) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="w-full max-w-sm relative z-10 flex flex-col items-center">
        
        {/* Top Branding Pill */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-purple-400 uppercase shadow-lg">
            <FaStar className="text-yellow-400" /> YB Connect
          </span>
        </div>

        {/* Premium Profile Card */}
        <div className="w-full bg-[#0F172A]/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          
          {/* Cover Photo / Gradient Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 relative">
            {/* Optional dot pattern for texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:14px_14px]"></div>
          </div>

          {/* Card Content Area */}
          <div className="px-6 pb-8 text-center relative">
            
            {/* Overlapping Avatar (Trendy rounded-2xl look) */}
            <div className="relative inline-block -mt-16 mb-4">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-32 h-32 rounded-[2rem] object-cover border-4 border-[#0F172A] shadow-xl bg-[#1E293B]"
              />
              {/* Trust Badge */}
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-[#0F172A]">
                <FaCheckCircle className="text-sm" />
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-white mb-2">{name}</h1>
            
            {/* Designation */}
            <p className="text-slate-300 font-medium text-sm flex items-center justify-center gap-2 mb-5">
              <FaBriefcase className="text-purple-400" /> {designation} {company}
            </p>

            {/* Info Pills (Location & Rating) */}
            <div className="flex justify-center gap-2 mb-6">
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-slate-400" /> {city}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5">
                ⭐ Top Mentor
              </span>
            </div>

            {/* Bio */}
            <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 px-2">
              {profile.bio || `Connect with ${name} for a dedicated 1-on-1 session on YB Connect.`}
            </p>

            {/* Deep Link Button (Client Component) */}
            <DeepLinkButton slug={resolvedParams.slug} />
            
            {/* Security Note */}
            <p className="text-[11px] text-slate-500 mt-5 font-medium flex items-center justify-center gap-1">
               Secure booking via YB Connect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
