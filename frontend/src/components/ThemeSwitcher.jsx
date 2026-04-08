import { useEffect, useState } from 'react';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    if (themeName === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    localStorage.setItem('app-theme', themeName);
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    applyTheme(themeName);
    setIsOpen(false);
  };

  const themes = [
    { 
      id: 'light', 
      label: 'Pastel Bloom',
      description: 'Soft & minimal',
      colors: ['#F9B2D7', '#CFECF3', '#DAF9DE', '#F6FFDC'],
      icon: '🎀'
    },
    { 
      id: 'dark', 
      label: 'Modern Dark',
      description: 'Bold & energetic',
      colors: ['#FF6B9D', '#00D9FF', '#00FF88', '#FFE066'],
      icon: '🌌'
    },
    { 
      id: 'tropical', 
      label: 'Tropical Vibes',
      description: 'Warm & vibrant',
      colors: ['#FF5722', '#FF9500', '#4CAF50', '#FFC107'],
      icon: '🌴'
    },
    { 
      id: 'ocean', 
      label: 'Ocean Serenity',
      description: 'Cool & fresh',
      colors: ['#0EA5E9', '#06B6D4', '#10B981', '#FBBF24'],
      icon: '🌊'
    },
  ];

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="theme-switcher">
      <button 
        className="theme-switcher__trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Change theme"
      >
        <span className="theme-switcher__icon">{currentTheme?.icon}</span>
        <span className="theme-switcher__label">{currentTheme?.label}</span>
        <svg 
          className={`theme-switcher__chevron${isOpen ? ' open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="5 8 8 11 11 8"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-switcher__dropdown">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-switcher__option${theme === t.id ? ' active' : ''}`}
              onClick={() => handleThemeChange(t.id)}
            >
              <div className="theme-switcher__option-header">
                <span className="theme-switcher__option-icon">{t.icon}</span>
                <div className="theme-switcher__option-text">
                  <div className="theme-switcher__option-name">{t.label}</div>
                  <div className="theme-switcher__option-desc">{t.description}</div>
                </div>
                {theme === t.id && (
                  <div className="theme-switcher__checkmark">✓</div>
                )}
              </div>
              <div className="theme-switcher__color-preview">
                {t.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="theme-switcher__color-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
