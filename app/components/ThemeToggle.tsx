"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCallback, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    // 檢查用戶是否偏好減少動畫
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // 直接切換主題，不執行動畫
      toggleTheme();
      return;
    }

    setIsAnimating(true);

    // 創建淡出淡入覆蓋層
    const overlay = document.createElement('div');
    overlay.className = 'theme-fade-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 40;
      background: ${theme === 'light' ? '#000000' : '#ffffff'};
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    `;

    document.body.appendChild(overlay);

    // 淡入
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    // 在動畫中途切換主題
    setTimeout(() => {
      toggleTheme();
    }, 150);

    // 淡出並移除覆蓋層
    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 150);

    // 動畫結束後移除覆蓋層並重置狀態
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      setIsAnimating(false);
    }, 450);
  }, [theme, toggleTheme, isAnimating]);

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className={`liquid-glass-btn icon-only ${className} theme-toggle-btn ${isAnimating ? 'animating' : ''}`}
      aria-label={`切換到${theme === 'light' ? '暗色' : '亮色'}主題`}
      title={`切換到${theme === 'light' ? '暗色' : '亮色'}主題`}
    >
      <div className="theme-icon-wrapper">
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </div>
    </button>
  );
} 