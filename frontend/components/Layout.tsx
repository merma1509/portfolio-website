import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
  currentPage?: string;
  showMobileMenuToggle?: boolean;
  className?: string;
}

export default function Layout({ 
  children, 
  currentPage = 'home', 
  showMobileMenuToggle = true,
  className = '' 
}: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${className}`}>
      <Navigation currentPage={currentPage} showMobileMenuToggle={showMobileMenuToggle} />
      {children}
    </div>
  );
}
