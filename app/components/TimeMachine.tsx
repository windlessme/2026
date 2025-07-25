"use client";

import { useState, useEffect, useRef } from "react";
import { Dices, ExternalLink } from "lucide-react";

interface TimeMachineProps {
  className?: string;
}

export default function TimeMachine({ className = "" }: TimeMachineProps) {
  const [isSlotMachineSpinning, setIsSlotMachineSpinning] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [slotMachineDisplay, setSlotMachineDisplay] = useState("2025");

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

  // 清理定時器的 ref
  const spinTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 組件卸載時清理定時器
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) {
        clearInterval(spinTimerRef.current);
      }
    };
  }, []);

  const spinSlotMachine = () => {
    if (isSlotMachineSpinning) return;

    setIsSlotMachineSpinning(true);

    const spinDuration = 2000; // 2秒
    // 根據設備調整動畫頻率，手機使用較慢的頻率
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const spinInterval = isMobile ? 100 : 50; // 手機100ms，桌面50ms
    const totalSpins = spinDuration / spinInterval;
    let currentSpin = 0;

    const spinEffect = setInterval(() => {
      const randomYear = years[Math.floor(Math.random() * years.length)].year;
      setSlotMachineDisplay(randomYear);
      currentSpin++;

      if (currentSpin >= totalSpins) {
        clearInterval(spinEffect);
        // 最終結果
        const finalYear = years[Math.floor(Math.random() * years.length)].year;
        setSelectedYear(finalYear);
        setSlotMachineDisplay(finalYear);
        setIsSlotMachineSpinning(false);
      }
    }, spinInterval);

    // 保存定時器引用以便清理
    spinTimerRef.current = spinEffect;
  };

  const goToSelectedYear = () => {
    const yearData = years.find((y) => y.year === selectedYear);
    if (yearData) {
      window.open(yearData.url, "_blank");
    }
  };

  return (
    <div className={className}>
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">年會時光機</h3>
      <div className="bg-card-background rounded-lg p-4 space-y-4">
        <p className="text-sm text-text-muted text-center">想回顧哪一年的 SITCON？來抽抽看吧！</p>

        <div className="flex items-center justify-center">
          <div className="bg-card-background rounded-lg px-6 py-4 border-2 border-card-border">
            <div
              className={`text-3xl font-bold text-center w-[80px] font-mono transition-all slot-machine-display ${
                isSlotMachineSpinning ? "text-yellow-400 blur-sm" : "text-foreground"
              }`}
            >
              {slotMachineDisplay}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={spinSlotMachine}
            disabled={isSlotMachineSpinning}
            className={`liquid-glass-btn flex-1 ${isSlotMachineSpinning ? "" : "primary"}`}
            aria-label={isSlotMachineSpinning ? "正在轉動中" : "隨機抽取年份"}
          >
            <Dices />
            {isSlotMachineSpinning ? "轉動中..." : "隨機抽取"}
          </button>

          <button
            onClick={goToSelectedYear}
            className="liquid-glass-btn primary flex-1"
            aria-label={`前往 ${selectedYear} 年會網站`}
          >
            <ExternalLink />
            前往 {selectedYear}
          </button>
        </div>
      </div>
    </div>
  );
} 