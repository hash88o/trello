import React, { useState, useEffect } from 'react';
import { Search, X, Heart } from 'lucide-react';
import globe from "../assets/globe-2-outline.png";
import hard from "../assets/Hard.png";
import add from "../assets/plus-circle-outline.png";
import bell from "../assets/bell-outline.png";
import alert from "../assets/alert-circle-outline.png";
import logo from "../assets/Logo (8).png";
import trellomarkblue from "../assets/trello-mark-blue.png";

const Navbar = ({ board }) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [userData, setUserData] = useState({
        currentUser: null,
        members: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api-5g5o.onrender.com/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('API Response:', data);
                setUserData({
                    currentUser: data.currentUser || null,
                    members: data.board?.members || []
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData({
                    currentUser: { id: 1, name: 'Test User', avatar: null },
                    members: Array(6).fill().map((_, i) => ({
                        id: i,
                        name: `Member ${i}`,
                        avatar: null
                    }))
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchSubmit = () => {
        setShowMobileSearch(false);
    };

    const getFallbackAvatar = (id) => `https://i.pravatar.cc/36?img=${id + 10}`;

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
                <div className="flex items-center">
                    <h1 className="hidden sm:block text-xl font-semibold mr-2 text-gray-800">
                        <img src={logo} alt="Trello" className="w-14 h-6" />
                    </h1>
                    <div className="hidden sm:block w-px h-6 bg-gray-300 mx-4"></div>
                    <button
                        className="text-sm flex flex-row items-center gap-2 px-2 py-1 rounded mr-2"
                        onClick={() => setShowMobileSearch((prev) => !prev)}
                    >
                        <img src={trellomarkblue} alt="Trello mark" />
                        <span className="hidden sm:block">Boards</span>
                        <Search className="w-4 h-4 sm:hidden" />
                    </button>
                    <div className="hidden sm:block w-px h-6 bg-gray-300 mx-4"></div>
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-100 px-3 py-1 pr-8 rounded-full text-sm w-90"
                        />
                        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900" />
                    </div>
                </div>

                <div className="flex items-center space-x-8">
                    <div className="flex items-center gap-3">
                        <button className="w-6 h-6 rounded-full flex items-center justify-center">
                            <img src={add} alt="Add" />
                        </button>
                        <button className="w-6 h-6 rounded-full flex items-center justify-center">
                            <img src={alert} alt="Alert" />
                        </button>
                        <button className="w-6 h-6 rounded-full flex items-center justify-center">
                            <img src={bell} alt="Notifications" />
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    ) : (
                        <img
                            src={userData.currentUser?.avatar || getFallbackAvatar(0)}
                            alt="User profile"
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getFallbackAvatar(0);
                            }}
                        />
                    )}
                </div>
            </div>

            {showMobileSearch && (
                <div className="block md:hidden px-4 py-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-100 px-3 py-2 pr-12 rounded-md text-sm"
                        />
                        <button
                            onClick={() => setShowMobileSearch(false)}
                            className="absolute right-10 top-1/2 transform -translate-y-1/2"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                            onClick={handleSearchSubmit}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <Search className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-2 mt-4">
                <div className="flex flex-col md:flex-row md:items-center">
                    <h2 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4">
                        {board?.title || "Brackets"}
                    </h2>

                    <div className="hidden md:flex items-center mr-4">
                        <button className="text-gray-200 mr-1">
                            <Heart className="h-5 w-5" />
                        </button>
                        <div className="w-px h-5 bg-gray-300 mx-2"></div>
                        <div className="flex items-center rounded px-1 py-1 text-sm">
                            <img src={globe} alt="Public" />
                            <span className="px-1 text-gray-300">Public</span>
                        </div>
                        <div className="w-px h-5 bg-gray-300 mx-2"></div>
                        <button className="text-gray-600">
                            <img src={hard} alt="Visibility" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-4">

                    <div className="flex items-center md:hidden">
                        <button className="text-gray-400">
                            <Heart className="h-4 w-4" />
                        </button>
                        <div className="w-px h-4 bg-gray-400 mx-1"></div>
                        <div className="flex items-center rounded px-1 py-1 text-sm">
                            <img src={globe} alt="Public" />
                            <span className="text-gray-400">Public</span>
                        </div>
                        <div className="w-px h-5 bg-gray-200"></div>
                        <button className="text-gray-600">
                            <img src={hard} alt="Visibility" />
                        </button>
                    </div>

                    <div className="flex items-center ml-auto">
                        <div className="flex -space-x-2 mr-1 md:mr-4">
                            {isLoading ? (
                                Array(3).fill().map((_, i) => (
                                    <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 border-2 border-white animate-pulse"></div>
                                ))
                            ) : (
                                userData.members.slice(0, 5).map((member, index) => (
                                    <div key={member.id || index} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden">
                                        <img
                                            src={member.avatar || getFallbackAvatar(index + 1)}
                                            alt={member.name || `Team member ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = getFallbackAvatar(index + 1);
                                            }}
                                        />
                                    </div>
                                ))
                            )}
                            {!isLoading && userData.members.length > 5 && (
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                                    +{userData.members.length - 5}
                                </div>
                            )}
                        </div>
                        <button className="text-gray-700 font-medium hover:bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded">
                            Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;