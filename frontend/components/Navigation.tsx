import { useTheme } from '../hooks/useTheme';
import { useMobileMenu } from '../hooks/useMobileMenu';

interface NavigationProps {
  currentPage?: string;
  showMobileMenuToggle?: boolean;
}

export default function Navigation({ currentPage = 'home', showMobileMenuToggle = true }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 p-3 sm:p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
          <a href="/" className="hover:opacity-80 transition-opacity">~M</a>
        </h1>

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        <div className="hidden xl:flex space-x-4 2xl:space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm 2xl:text-base"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-110"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile/Tablet Menu Controls - Always Visible on smaller screens */}
        <div className="xl:hidden flex items-center space-x-1 sm:space-x-2">
          {showMobileMenuToggle && (
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 sm:p-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
            >
              <span className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl">
                {isMobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Overlay style */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="max-w-6xl mx-auto py-4 px-3 sm:px-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-2 text-sm sm:text-base"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
