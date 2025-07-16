"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, Star, ExternalLink } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  link: string;
  duration?: number; // 活動持續時間（小時），預設 3 小時
}

type EventStatus = "upcoming" | "ongoing" | "completed";

export default function RecentEvents() {
  // 計算活動狀態
  const calculateEventStatus = (date: string, time: string, duration: number = 3): EventStatus => {
    const now = new Date();
    const eventDateTime = new Date(`${date} ${time}`);
    const eventEndTime = new Date(eventDateTime.getTime() + duration * 60 * 60 * 1000);

    if (now < eventDateTime) {
      return "upcoming";
    } else if (now >= eventDateTime && now <= eventEndTime) {
      return "ongoing";
    } else {
      return "completed";
    }
  };

  // 取得狀態顯示文字
  const getStatusText = (status: EventStatus): string => {
    switch (status) {
      case "upcoming":
        return "即將舉行";
      case "ongoing":
        return "進行中";
      case "completed":
        return "已結束";
      default:
        return "未知狀態";
    }
  };

  // 取得狀態樣式
  const getStatusStyle = (status: EventStatus): string => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "ongoing":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "completed":
        return "bg-gray-600/20 text-gray-400 border border-gray-600/30";
      default:
        return "bg-gray-600/20 text-gray-400 border border-gray-600/30";
    }
  };

  // 取得邊框樣式
  const getBorderStyle = (status: EventStatus): string => {
    switch (status) {
      case "upcoming":
        return "border-l-4 border-l-blue-500";
      case "ongoing":
        return "border-l-4 border-l-green-500";
      case "completed":
        return "border-l-4 border-l-gray-600";
      default:
        return "border-l-4 border-l-gray-600";
    }
  };

  // 最近活動資料
  const recentEvents: Event[] = [
    {
      id: 1,
      title: "SITCON 2026 BoF 定期聚",
      date: "2025-08-09",
      time: "18:00",
      location: "臺灣師範大學",
      description: "想更了解 SITCON 或參與 2026 的籌備嗎？歡迎來聊聊！",
      type: "meeting",
      link: "https://forms.gle/rr93tuxJ9m9uStDf9",
      duration: 2, // 2 小時
    },
    {
      id: 2,
      title: "SITCON 2026 議程組傳承研討會",
      date: "2025-07-16",
      time: "22:30",
      location: "線上會議",
      description: "想成為 SITCON 2026 的議程組組長嗎？歡迎參加說明會了解更多！",
      type: "meeting",
      link: "https://meet.google.com/mqq-czuz-tap",
      duration: 2, // 1.5 小時
    },
  ];

  return (
    <div className="flex justify-center animate-fade-in-up animation-delay-1200 px-4">
      <div className="timeline-card rounded-lg p-4 md:p-6 space-y-4 w-full max-w-4xl">
        <div className="text-center space-y-2">
          <h3 className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2">
            <Star className="w-5 h-5" />
            最近活動
          </h3>
          <p className="text-sm text-gray-400">掌握最新 SITCON 活動資訊</p>
        </div>

        <div className="space-y-3">
          {recentEvents.map((event) => {
            const status = calculateEventStatus(event.date, event.time, event.duration);
            return (
              <div
                key={event.id}
                className={`bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 ${getBorderStyle(status)}`}
              >
                <div className="space-y-3">
                  {/* Title and Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm md:text-base leading-tight text-left">
                        {event.title}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(status)}`}
                    >
                      {getStatusText(status)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="text-left">
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{event.description}</p>
                  </div>

                  {/* Date, Time, Location - Mobile Optimized */}
                  <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>
                        {(() => {
                          const date = new Date(event.date);
                          const year = date.getFullYear();
                          const month = date.getMonth() + 1;
                          const day = date.getDate();
                          return `${year} 年 ${month} 月 ${day} 日`;
                        })()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {event.link && event.link !== "#" && (
                    <div className="flex justify-end pt-1">
                      <Link
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
                        className="liquid-glass-btn secondary small"
                        aria-label={`前往 ${event.title}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="hidden sm:inline">前往</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            href="https://groups.google.com/g/sitcon-general/"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm underline decoration-dotted underline-offset-2"
          >
            訂閱郵件論壇獲取更多活動資訊 →
          </Link>
        </div>
      </div>
    </div>
  );
} 