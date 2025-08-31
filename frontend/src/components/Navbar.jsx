import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate, Link as RouterLink } from "react-router-dom"; 
// import { logout } from '../services/auth';
// import { logout } from "../AuthService";
// import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";




const Navbar = ({ isAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-green-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link component={RouterLink} to="/" underline="none" color="inherit" className="text-xl font-bold flex items-center">
                            <span className="mr-2">🌿</span>
                            EcoTrack
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link component={RouterLink} to="/" underline="none" color="inherit" className="px-3 py-2 rounded-md hover:bg-green-700">Home</Link>
                        <Link component={RouterLink} to="/map" underline="none" color="inherit" className="px-3 py-2 rounded-md hover:bg-green-700">Map</Link>
                        <Link component={RouterLink} to="/profile" underline="none" color="inherit" className="px-3 py-2 rounded-md hover:bg-green-700">Profile</Link>
                        {isAuthenticated ? (
                            <button 
                                onClick={handleLogout}
                                className="px-3 py-2 rounded-md bg-red-500 hover:bg-red-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link component={RouterLink} to="/login" underline="none" color="inherit" className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600">Login</Link>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link component={RouterLink}
                            to="/" underline="none" color="inherit" 
                            className="block px-3 py-2 rounded-md hover:bg-green-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link component={RouterLink}
                            to="/map" underline="none" color="inherit"
                            className="block px-3 py-2 rounded-md hover:bg-green-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Map
                        </Link>
                        <Link component={RouterLink}
                            to="/profile" underline="none" color="inherit"
                            className="block px-3 py-2 rounded-md hover:bg-green-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                        {isAuthenticated ? (
                            <button 
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left block px-3 py-2 rounded-md bg-red-500 hover:bg-red-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link component={RouterLink}
                                to="/login" underline="none" color="inherit"
                                className="block px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;