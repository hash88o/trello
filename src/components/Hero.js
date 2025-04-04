import React, { useEffect, useRef, useState } from "react";
import { Plus, MessageSquare, Paperclip, Heart } from "lucide-react";


const Hero = () => {
    const [boardData, setBoardData] = useState({
        title: "Project Dashboard",
        lists: [],
        labelColors: {},
        members: []
    });
    const [userData, setUserData] = useState({
        currentUser: null,
        members: []
    });
    const [isLoading, setIsLoading] = useState(true);

    const scrollContainerRef = useRef(null);
    const [scrollInfo, setScrollInfo] = useState({
        scrollWidth: 0,
        clientWidth: 0,
        scrollLeft: 0,
    });

    const thumbWidth =
        scrollInfo.scrollWidth > 0
            ? Math.max(30, (scrollInfo.clientWidth / scrollInfo.scrollWidth) * 100)
            : 100;

    const thumbPosition =
        scrollInfo.scrollWidth > 0
            ? (scrollInfo.scrollLeft /
                (scrollInfo.scrollWidth - scrollInfo.clientWidth)) *
            (100 - thumbWidth)
            : 0;

    const needsScrolling = scrollInfo.scrollWidth > scrollInfo.clientWidth;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api-5g5o.onrender.com/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setUserData({
                    currentUser: data.currentUser || null,
                    members: data.members || []
                });

                if (data.board) {
                    setBoardData(data.board);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
                setScrollInfo({ scrollWidth, clientWidth, scrollLeft });
            }
        };

        handleScroll();

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);

            const resizeObserver = new ResizeObserver(handleScroll);
            resizeObserver.observe(scrollContainer);

            return () => {
                scrollContainer.removeEventListener("scroll", handleScroll);
                resizeObserver.disconnect();
            };
        }
    }, []);


    useEffect(() => {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;

        const handleTouchStart = (e) => {
            if (!scrollContainerRef.current) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        };

        const handleTouchMove = (e) => {
            if (!scrollContainerRef.current || e.touches.length !== 1) return;

            const deltaX = startX - e.touches[0].clientX;
            const deltaY = startY - e.touches[0].clientY;

            if (!isScrolling && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                isScrolling = true;
            }

            if (isScrolling) {
                e.preventDefault();
                scrollContainerRef.current.scrollLeft += deltaX;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("touchstart", handleTouchStart, { passive: true });
            container.addEventListener("touchmove", handleTouchMove, { passive: false });

            return () => {
                container.removeEventListener("touchstart", handleTouchStart);
                container.removeEventListener("touchmove", handleTouchMove);
            };
        }
    }, []);

    const getFallbackAvatar = (id) => `https://i.pravatar.cc/36?img=${id + 10}`;


    const Card = ({ card, labelColors }) => {
        return (
            <div className="bg-gray-100 rounded">
                {card.coverImage && (
                    <div className="h-32 overflow-hidden rounded-t">
                        <img
                            src={card.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="p-2">
                    {card.labels && card.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            {card.labels.map((label) => (
                                <div
                                    key={label.id}
                                    className="w-8 h-2 rounded"
                                    style={{ backgroundColor: labelColors[label.color] }}
                                />
                            ))}
                        </div>
                    )}
                    <h4 className="text-sm font-medium mb-1">{card.title}</h4>

                    {card.description && (
                        <p className="text-xs text-gray-400 mb-6">{card.description}</p>
                    )}

                    <div className="flex items-center justify-between mt-2 mb-2">
                        <div className="flex -space-x-1">
                            {card.members &&
                                card.members.length > 0 &&
                                card.members.map((member) => (
                                    <img
                                        key={member.id}
                                        src={member.avatar}
                                        alt="Member"
                                        className="w-6 h-6 rounded-full border border-white"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = getFallbackAvatar(member.id);
                                        }}
                                    />
                                ))}
                            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                                <Plus className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                            {card.comments > 0 && (
                                <div className="flex items-center mr-3">
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    {card.comments}
                                </div>
                            )}
                            {card.attachments > 0 && (
                                <div className="flex items-center mr-3">
                                    <Paperclip className="h-3 w-3 mr-1" />
                                    {card.attachments}
                                </div>
                            )}
                            {card.votes > 0 && (
                                <div className="flex items-center">
                                    <Heart className="h-3 w-3 mr-1" />
                                    {card.votes}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const List = ({ list, labelColors }) => {
        return (
            <div className="min-w-[272px] flex flex-col max-h-full rounded">
                <div className="flex justify-between bg-gray-100 rounded mb-2 items-center p-2 sticky top-0 z-10">
                    <h3 className="font-medium text-sm">{list.title}</h3>
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="pb-2 space-y-2 overflow-y-auto flex-grow scrollbar-hide custom-scroll">
                    {list.cards.map((card) => (
                        <Card key={card.id} card={card} labelColors={labelColors} />
                    ))}
                    <button className="border border-dashed border-gray-300 flex items-center justify-center w-full p-8 hover:bg-gray-200 rounded text-gray-800 text-sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add new card
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow p-4 h-[calc(100vh-144px)] overflow-hidden">
                <div className="flex flex-col h-full w-full overflow-hidden relative">
                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 mx-4 rounded-full bg-transparent"
                        style={{ zIndex: 50 }}
                    >
                        {needsScrolling ? (
                            <div
                                className="absolute top-0 h-full bg-gray-400 rounded-full transition-all duration-100"
                                style={{
                                    width: `${thumbWidth}%`,
                                    left: `${thumbPosition}%`,
                                }}
                            ></div>
                        ) : (
                            <div className="absolute top-0 h-full w-full bg-gray-400 rounded-full"></div>
                        )}
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto h-full w-full scrollbar-hide"
                        style={{
                            gap: "1.5rem",
                            minWidth: "100%",
                            WebkitOverflowScrolling: "touch",
                            touchAction: "pan-x",
                            msOverflowStyle: "none",
                            scrollbarWidth: "none",
                            paddingBottom: "1rem",
                        }}
                    >
                        {isLoading ? (
                            Array(3).fill().map((_, index) => (
                                <div key={index} className="flex-shrink-0 w-[280px] h-full">
                                    <div className="bg-gray-100 rounded p-2 h-12 mb-2 animate-pulse"></div>
                                    <div className="space-y-2">
                                        {Array(3).fill().map((_, cardIndex) => (
                                            <div key={cardIndex} className="bg-white rounded p-4 h-24 animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            boardData.lists.map((list) => (
                                <div key={list.id} className="flex-shrink-0 w-[280px] h-full">
                                    <List list={list} labelColors={boardData.labelColors} />
                                </div>
                            ))
                        )}
                        <div className="flex-shrink-0 w-[5px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;