"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, Mail, Info, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram, faThreads, faFlickr, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const years = [
    { year: "2013", url: "https://sitcon.org/2013" },
    { year: "2014", url: "https://sitcon.org/2014" },
    { year: "2015", url: "https://sitcon.org/2015" },
    { year: "2016", url: "https://sitcon.org/2016" },
    { year: "2017", url: "https://sitcon.org/2017" },
    { year: "2018", url: "https://sitcon.org/2018" },
    { year: "2019", url: "https://sitcon.org/2019" },
    { year: "2020", url: "https://sitcon.org/2020" },
    { year: "2021", url: "https://sitcon.org/2021" },
    { year: "2022", url: "https://sitcon.org/2022" },
    { year: "2024", url: "https://sitcon.org/2024" },
    { year: "2025", url: "https://sitcon.org/2025" },
  ];

  const socialLinks = [
    { name: "Facebook", url: "https://sitcon.org/fb", icon: faFacebook },
    { name: "YouTube", url: "https://sitcon.org/yt", icon: faYoutube },
    { name: "Instagram", url: "https://sitcon.org/instagram", icon: faInstagram },
    { name: "Threads", url: "https://sitcon.org/threads", icon: faThreads },
    { name: "Flickr", url: "https://sitcon.org/flickr", icon: faFlickr },
    { name: "Telegram", url: "https://sitcon.org/tg", icon: faTelegram },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="text-center space-y-8 animate-fade-in">
        {/* Title */}
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight animate-fade-in-up">
          SITCON 2026
        </h1>
        
        {/* Subtitle */}
        <div className="space-y-4 animate-fade-in-up animation-delay-300">
          <p className="text-xl md:text-2xl text-gray-300">
            學生計算機年會
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>2026 年 3 月 28 日 (六)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>中央研究院人文社會科學館</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <Link
            href="https://forms.gle/rr93tuxJ9m9uStDf9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Users className="w-5 h-5" />
            工人預約跳坑
          </Link>
          
          <Link
            href="https://groups.google.com/g/sitcon-general/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white/20 text-white rounded-lg font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            郵件論壇
          </Link>
          
          <button
            onClick={() => setIsAboutOpen(true)}
            className="px-8 py-4 border border-white/20 text-white rounded-lg font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Info className="w-5 h-5" />
            關於 SITCON
          </button>
        </div>
      </div>
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/2 rounded-full blur-3xl" style={{ animation: 'subtlePulse 4s ease-in-out infinite' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/2 rounded-full blur-3xl" style={{ animation: 'subtlePulse 4s ease-in-out infinite 2s' }}></div>
      </div>

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">關於 SITCON</h2>
              <button
                onClick={() => setIsAboutOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <p className="text-gray-300 leading-relaxed">
                  學生計算機年會（Students' Information Technology Conference）自 2012 年發起，以學生為本、由學生自發舉辦，長期投身學生資訊教育與推廣開源精神，希望引領更多學子踏入資訊的殿堂，更冀望所有對資訊有興趣的學生，能夠在年會裏齊聚一堂，彼此激盪、傳承、啟發，達到「學以致用、教學相長」的實際展現。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">歷年年會</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {years.map((item) => (
                    <Link
                      key={item.year}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-600 hover:border-blue-400 transition-all duration-200 text-sm font-medium"
                    >
                      {item.year}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">聯絡我們</h3>
                <Link
                  href="mailto:contact@sitcon.org"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  contact@sitcon.org
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">社群媒體</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                      <span>{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 