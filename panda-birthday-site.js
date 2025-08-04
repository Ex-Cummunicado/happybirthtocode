// ===== package.json =====
{
  "name": "panda-birthday-microsite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "canvas-confetti": "^1.9.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "vite": "^4.4.5"
  }
}

// ===== main.jsx =====
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ===== index.css =====
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ff69b4;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff1493;
}

/* Gradient backgrounds */
.gradient-pink {
  background: linear-gradient(135deg, #ffb3d9 0%, #ff69b4 100%);
}

.gradient-green {
  background: linear-gradient(135deg, #98fb98 0%, #90ee90 100%);
}

.gradient-yellow {
  background: linear-gradient(135deg, #ffffe0 0%, #ffff99 100%);
}

.gradient-pastel {
  background: linear-gradient(135deg, #ffb3d9 0%, #98fb98 33%, #ffff99 66%, #ffb3d9 100%);
}

/* Animation keyframes */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.bounce {
  animation: bounce 2s ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes wiggle {
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
}

.wiggle {
  animation: wiggle 2s ease-in-out;
}

/* Responsive utilities */
@media (max-width: 768px) {
  .text-responsive {
    font-size: clamp(1.5rem, 4vw, 3rem);
  }
  
  .text-responsive-sub {
    font-size: clamp(1rem, 3vw, 1.5rem);
  }
}

// ===== App.jsx =====
import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// ===== CONFIGURATION - EASILY EDITABLE =====
const CONFIG = {
  // Personal details
  herName: "Sarah", // CHANGE THIS to her name
  
  // Password for locked message
  secretPassword: "bestfriends", // CHANGE THIS to your special word
  
  // Secret message content
  secretMessage: `My dearest friend,

I know we haven't talked in a while, and life has pulled us in different directions, but you've never left my thoughts. Every funny meme, every random Tuesday, every small victory - I still think "I should tell Sarah about this."

You have this incredible way of making everything brighter just by being yourself. Your laugh could cure any bad day, and your friendship has been one of the greatest gifts of my life.

I miss our random conversations, our inside jokes, and the way you always knew exactly what to say. Distance and time might separate us, but the bond we share is unbreakable.

Happy birthday, you absolute gem! I hope this year brings you all the joy, adventures, and panda cuddles your heart desires.

Love always,
Your friend who thinks about you more than you know 💕🐼`,

  // Memory section captions
  memories: [
    {
      caption: "This is us surviving life together 😂",
      pandaType: "laughing" // placeholder for panda GIF type
    },
    {
      caption: "When you send me memes at 3 AM 🐼",
      pandaType: "sleepy"
    },
    {
      caption: "Our friendship energy in one GIF ✨",
      pandaType: "dancing"
    },
    {
      caption: "You helping me through tough times 🤗",
      pandaType: "hugging"
    },
    {
      caption: "Us planning our next adventure 🗺️",
      pandaType: "excited"
    }
  ],

  // Social links
  whatsappLink: "https://wa.me/1234567890", // CHANGE THIS to your WhatsApp
  instagramLink: "https://instagram.com/yourusername" // CHANGE THIS to your Instagram
}

// ===== CONFETTI FUNCTIONS =====
const triggerConfetti = () => {
  // Burst from center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff69b4', '#98fb98', '#ffff99', '#000000', '#ffffff']
  })
  
  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ff69b4', '#98fb98', '#ffff99']
    })
  }, 250)
  
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ff69b4', '#98fb98', '#ffff99']
    })
  }, 400)
}

// ===== PANDA PLACEHOLDER COMPONENT =====
const PandaPlaceholder = ({ type = "default", size = "medium", className = "" }) => {
  const sizes = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-48 h-48",
    xlarge: "w-64 h-64"
  }
  
  const pandaEmojis = {
    default: "🐼",
    waving: "👋🐼",
    laughing: "😂🐼",
    sleepy: "😴🐼",
    dancing: "💃🐼",
    hugging: "🤗🐼",
    excited: "🎉🐼",
    heart: "❤️🐼"
  }
  
  return (
    <div className={`${sizes[size]} ${className} bg-white rounded-full border-4 border-gray-800 flex items-center justify-center text-4xl shadow-lg`}>
      <span className="text-2xl">{pandaEmojis[type]}</span>
      <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 opacity-50">
        GIF
      </div>
    </div>
  )
}

// ===== HERO SECTION =====
const HeroSection = () => {
  useEffect(() => {
    // Trigger confetti on page load
    const timer = setTimeout(() => {
      triggerConfetti()
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <section className="min-h-screen gradient-pastel flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating pandas in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 opacity-20"
        >
          <PandaPlaceholder type="default" size="small" />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 opacity-20"
        >
          <PandaPlaceholder type="waving" size="small" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 opacity-20"
        >
          <PandaPlaceholder type="heart" size="small" />
        </motion.div>
      </div>
      
      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Main heading with bounce animation */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 bounce text-gray-800"
        >
          Happy Birthday {CONFIG.herName}! 🎉
        </motion.h1>
        
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 font-medium"
        >
          It's been a while, but I couldn't miss today. 🐼
        </motion.p>
        
        {/* Center panda with float animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.5 }}
          className="float"
        >
          <PandaPlaceholder type="waving" size="xlarge" className="mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}

// ===== MEMORY SECTION =====
const MemorySection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-pink-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
        >
          Our Friendship in GIFs 📸
        </motion.h2>
        
        <div className="space-y-32">
          {CONFIG.memories.map((memory, index) => {
            const y = useTransform(scrollYProgress, [0, 1], [0, -50])
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Panda GIF with parallax */}
                <motion.div style={{ y }} className="flex-shrink-0">
                  <PandaPlaceholder 
                    type={memory.pandaType} 
                    size="large" 
                    className="shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
                
                {/* Memory caption */}
                <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                  >
                    {memory.caption}
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ===== PASSWORD PROTECTED NOTE SECTION =====
const PasswordSection = () => {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  
  const handleSubmit = () => {
    setError('')
    
    if (password.trim().toLowerCase() === CONFIG.secretPassword.toLowerCase()) {
      setIsUnlocked(true)
      triggerConfetti()
      setShowConfetti(true)
      
      setTimeout(() => setShowConfetti(false), 3000)
    } else {
      setError('🐼 Nope! Try again, bestie.')
      setTimeout(() => setError(''), 3000)
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  
  return (
    <section className="py-20 gradient-yellow">
      <div className="max-w-2xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
        >
          The Closest Message to My Heart ❤️
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-center text-gray-600 mb-12"
        >
          (Unlock with our special word)
        </motion.p>
        
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            // Locked state
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-gray-800"
            >
              <div className="text-center mb-8">
                <PandaPlaceholder type="default" size="large" className="mx-auto mb-4" />
                <p className="text-gray-600 text-lg">This panda is guarding something special...</p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter our special word..."
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-pink-500 focus:outline-none text-lg font-medium transition-colors"
                />
                
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-center font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full gradient-pink text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Unlock Message 🔓
                </motion.button>
              </div>
            </motion.div>
          ) : (
            // Unlocked state
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Success message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  🎉 Hooray! You've successfully unlocked the closest message to my heart.
                </h3>
                {showConfetti && (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: 2 }}
                    className="inline-block"
                  >
                    <PandaPlaceholder type="dancing" size="medium" />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Secret message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-pink-300"
              >
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {CONFIG.secretMessage}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ===== CLOSING SECTION =====
const ClosingSection = () => {
  return (
    <section className="py-20 gradient-green">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-gray-800"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="mb-8"
          >
            <PandaPlaceholder type="heart" size="large" className="mx-auto" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            P.S. You make the world brighter just by being you. Let's catch up soon 🐾
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-pink text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow inline-block"
            >
              💬 WhatsApp Me
            </motion.a>
            
            <motion.a
              href={CONFIG.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow inline-block"
            >
              📸 Instagram DM
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ===== EASTER EGG COMPONENT =====
const EasterEgg = () => {
  const [isRevealed, setIsRevealed] = useState(false)
  
  const handleClick = () => {
    setIsRevealed(!isRevealed)
    if (!isRevealed) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.9, y: 0.9 },
        colors: ['#ff69b4', '#000000', '#ffffff']
      })
    }
  }
  
  return (
    <>
      {/* Hidden panda icon */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg border-2 border-gray-800"
      >
        <PandaPlaceholder type="default" size="small" />
      </motion.button>
      
      {/* Easter egg modal */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsRevealed(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-md text-center border-4 border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="wiggle mb-4">
                <PandaPlaceholder type="excited" size="large" className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                🎉 You found the secret panda! 🎉
              </h3>
              <p className="text-gray-600 text-lg">
                This little guy represents all the hidden surprises our friendship brings! 
                Just like finding this easter egg, you always find ways to make life more fun! 🐼✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ===== MAIN APP COMPONENT =====
export default function App() {
  return (
    <div className="App">
      <HeroSection />
      <MemorySection />
      <PasswordSection />
      <ClosingSection />
      <EasterEgg />
    </div>
  )
}