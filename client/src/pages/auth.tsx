import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";


export default function Auth() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Elevate your brand with humanized voice assistants that deliver",
      highlight: "personalized, engaging customer experiences at scale.",
      keywords: [
        "Whimsy", "Ito", "Expressivity", "Korg", "Femininity", "Agentic Workflows",
        "Stella", "Enunciation", "TTS injection", "NPC", "Assistant", "Speed",
        "Twilio", "Web Speech", "Doccer", "API", "Interjection"
      ] as string[],
      background: "from-dark-navy/90 via-midnight/80 to-primary/30"
    },
    {
      id: 2,
      title: "Make custom Voice Personas fitting",
      highlight: "Your Use-Case",
      images: [
        "/api/placeholder/120/120", "/api/placeholder/150/100", "/api/placeholder/140/140",
        "/api/placeholder/130/110", "/api/placeholder/160/120", "/api/placeholder/110/130",
        "/api/placeholder/140/100", "/api/placeholder/120/140", "/api/placeholder/150/110"
      ] as string[],
      background: "from-midnight/90 via-deep-purple/80 to-accent/30"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Increased from 4000ms to 8000ms (8 seconds per slide)

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleGoogleLogin = () => {
    window.location.href = "/auth";
  };

  const FloatingKeyword = ({ keyword, index }: { keyword: string; index: number }) => {
    const positions = [
      { x: 15, y: 20 }, { x: 65, y: 15 }, { x: 25, y: 35 }, { x: 80, y: 25 },
      { x: 10, y: 50 }, { x: 55, y: 45 }, { x: 85, y: 55 }, { x: 20, y: 70 },
      { x: 70, y: 65 }, { x: 35, y: 80 }, { x: 60, y: 85 }, { x: 40, y: 10 },
      { x: 90, y: 40 }, { x: 5, y: 30 }, { x: 75, y: 75 }, { x: 45, y: 25 },
      { x: 30, y: 60 }
    ];

    const position = positions[index % positions.length];

    return (
      <motion.div
        className="absolute text-white/70 font-medium text-sm md:text-base select-none"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.4, 0.9, 0.4], 
          scale: [0.9, 1.1, 0.9],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 3,
          delay: index * 0.15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {keyword}
      </motion.div>
    );
  };

  const PhotoCollage = () => {
    const imageUrls = [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    ];

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 max-w-lg">
          {imageUrls.map((src, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-xl overflow-hidden shadow-xl border border-white/20"
              style={{
                width: index % 2 === 0 ? "140px" : "120px",
                height: index % 3 === 0 ? "140px" : "120px"
              }}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ 
                opacity: [0.8, 1, 0.8], 
                scale: [0.95, 1.02, 0.95],
                y: [0, -5, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src={src} 
                alt={`Person ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/40 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-midnight to-deep-purple flex">
      {/* Left Side - Authentication */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white/10 border-white/20 backdrop-blur-md">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <motion.h1 
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }} // Slower and smoother transition
              >
                Welcome to <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">NeuraVoice</span>
              </motion.h1>
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }} // Slower and smoother transition
              >
                Sign in to create your intelligent voice assistants
              </motion.p>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }} // Slower and smoother transition
            >
              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                size="lg"
              >
                <FaGoogle className="text-xl" />
                Continue with Google
              </Button>
            </motion.div>

            <motion.div 
              className="text-center text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }} // Slower and smoother transition
            >
              By continuing, you agree to our Terms of Service and Privacy Policy
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Animated Visuals */}
      <div className="w-1/2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].background} flex flex-col items-center justify-center p-8`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            {/* Visual Content First */}
            <div className="relative h-96 w-full mb-8">
              {currentSlide === 0 ? (
                // Keywords floating animation
                <div className="relative w-full h-full">
                  {slides[0].keywords?.map((keyword, index) => (
                    <FloatingKeyword key={keyword} keyword={keyword} index={index} />
                  ))}
                </div>
              ) : (
                // Photo collage animation
                <PhotoCollage />
              )}
            </div>

            {/* Text Content Below */}
            <div className="text-left max-w-lg px-8">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {slides[currentSlide].title}{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-black">
                  {slides[currentSlide].highlight}
                </span>
              </motion.h2>
            </div>


          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}