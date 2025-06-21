import { useState, useEffect, useContext } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

export default function Navigation() {
  const { isAuthenticated, logout } = useContext(AuthContext); // Use context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAuth, setActiveAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handlers with auto-scroll
  const handleNavigation = (callback) => {
    if (callback) callback();
    setIsMenuOpen(false);
    setActiveAuth(null); 
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleSignIn = () => {
    setActiveAuth('signin');
    setTimeout(() => {
      handleNavigation(() => navigate('/login'));
    }, 150);
  };

  const handleSignUp = () => {
    setActiveAuth('signup');
    setTimeout(() => {
      handleNavigation(() => navigate('/register'));
    }, 150);
  };

  const handleSignOut = () => {
    logout(); // Use context logout function
    handleNavigation(() => navigate('/'));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveAuth(null);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium text-sm uppercase tracking-wide transition-colors duration-300 ${
      isActive
        ? 'text-white border-b-2 border-white'
        : 'text-white/80 hover:text-white'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `text-lg font-medium py-3 px-6 transition-colors duration-300 ${
      isActive 
        ? 'text-white border-b-2 border-white' 
        : 'text-white/90 hover:text-white'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-md'
        }`}
      >
        {/* Logo */}
        <div className="text-white">
          <NavLink
            to="/"
            className="text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent hover:from-blue-100 hover:via-white hover:to-blue-100 transition-all duration-300 drop-shadow-sm"
            onClick={closeMenu}
          >
            The Luxury
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center flex-1 mr-0">
          <div className="flex space-x-4">
            <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/rooms" className={navLinkClass} onClick={closeMenu}>
              Rooms
            </NavLink>
            <NavLink to="/facilities" className={navLinkClass} onClick={closeMenu}>
              Experiences
            </NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/account"
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105"
                onClick={closeMenu}
              >
                <User size={18} />
              </NavLink>
              <button
                onClick={handleSignOut}
                className="bg-red-600/80 hover:bg-red-600 text-white font-medium py-2.5 px-5 rounded-full transition-all duration-300 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50 flex items-center space-x-2 hover:scale-105"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className={`font-medium py-2.5 px-6 rounded-full transition-all duration-300 border ${
                  activeAuth === 'signin'
                    ? 'bg-white/20 text-white border-white/40 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border-white/20 hover:border-white/30'
                } backdrop-blur-sm`}
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className={`font-medium py-2.5 px-6 rounded-full transition-all duration-300 ${
                  activeAuth === 'signup'
                    ? 'bg-blue-600 text-white border border-blue-500 scale-105'
                    : 'bg-blue-700/80 hover:bg-blue-600 text-white border border-blue-600/50 hover:border-blue-500'
                } backdrop-blur-sm hover:scale-105`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-opacity-98 backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/20"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-300/20"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-white/10"></div>
          </div>

          <div className="relative flex flex-col space-y-4 text-white text-center w-full max-w-xs">
            <NavLink to="/" onClick={closeMenu} className={mobileNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/rooms" onClick={closeMenu} className={mobileNavLinkClass}>
              Rooms & Suites
            </NavLink>
            <NavLink to="/facilities" onClick={closeMenu} className={mobileNavLinkClass}>
              Experiences
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={mobileNavLinkClass}>
              Contact
            </NavLink>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/account"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 py-3 px-6 ${
                      isActive 
                        ? 'text-white border-b-2 border-white' 
                        : 'text-white/90 hover:text-white'
                    }`
                  }
                >
                  <User size={20} />
                  <span>My Account</span>
                </NavLink>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600/80 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50 flex items-center justify-center space-x-2 mx-auto hover:scale-105"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className={`font-medium py-3 px-8 rounded-lg transition-all duration-300 border ${
                    activeAuth === 'signin'
                      ? 'bg-white/20 text-white border-white/40 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border-white/20 hover:border-white/30'
                  } backdrop-blur-sm hover:scale-105`}
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className={`font-medium py-3 px-8 rounded-lg transition-all duration-300 ${
                    activeAuth === 'signup'
                      ? 'bg-blue-600 text-white border border-blue-500 scale-105'
                      : 'bg-blue-700/80 hover:bg-blue-600 text-white border border-blue-600/50 hover:border-blue-500'
                  } backdrop-blur-sm hover:scale-105`}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}