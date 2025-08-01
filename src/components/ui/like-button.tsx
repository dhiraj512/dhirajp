'use client';

import { useState, useEffect, useTransition } from 'react';
import { motion } from 'motion/react';
import { incrementLikes, getCounts } from '@/lib/actions/stats';
import { getSessionId } from '@/lib/session';
import Icon from './icon';

interface LikeButtonProps {
    slug: string;
}

const emojis = ["👍", "🙏", "🥰"];

export default function LikeButton({ slug }: LikeButtonProps) {
    const [likes, setLikes] = useState(0);
    const [currentUserLikes, setCurrentUserLikes] = useState(0);
    const [animatedEmojis, setAnimatedEmojis] = useState<{ id: string; emoji: string }[]>([]);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            try {
                const sessionId = getSessionId();
                const counts = await getCounts(slug, sessionId);

                setLikes(counts.likes ?? 0);
                setCurrentUserLikes(counts.userLikes ?? 0);

                // Set initial animated emojis if user has liked before
                if (counts.userLikes > 0) {
                    const initialEmojis = Array.from({ length: counts.userLikes }, (_, i) => ({
                        id: `initial-${i}`,
                        emoji: emojis[i] || emojis[emojis.length - 1]
                    }));
                    setAnimatedEmojis(initialEmojis);
                }
            } catch (error) {
                console.error('Failed to initialize like button:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initialize();
    }, [slug]);

    const handleClick = () => {
        // Prevent more than 3 likes per user
        if (currentUserLikes >= 3 || isPending) return;

        const newUserLikes = currentUserLikes + 1;
        const newTotalLikes = likes + 1;

        // Optimistic UI updates
        setCurrentUserLikes(newUserLikes);
        setLikes(newTotalLikes);

        // Add animated emoji
        const newEmoji = {
            id: `emoji-${Date.now()}-${Math.random()}`,
            emoji: emojis[currentUserLikes] || emojis[emojis.length - 1]
        };
        setAnimatedEmojis(prev => [...prev, newEmoji]);

        // Server action with error handling
        startTransition(async () => {
            try {
                const sessionId = getSessionId();
                const result = await incrementLikes(slug, sessionId);

                if (result !== null) {
                    // Update with server values
                    setLikes(result.totalLikes);
                    setCurrentUserLikes(result.userLikes);
                }
            } catch (error) {
                console.error('Failed to increment likes:', error);
                // Revert optimistic updates on error
                setCurrentUserLikes(currentUserLikes);
                setLikes(likes);
                // Remove the last emoji
                setAnimatedEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
            }
        });

        // Remove emoji after animation completes
        setTimeout(() => {
            setAnimatedEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
        }, 750);
    };

    const getGradientTransform = () => {
        switch (currentUserLikes) {
            case 0: return "translate-y-8";
            case 1: return "translate-y-5";
            case 2: return "translate-y-3";
            default: return "translate-y-0";
        }
    };

    const getHoverShadow = () => {
        return currentUserLikes === 0 ? "hover:shadow-gray-500/30" : "hover:shadow-purple-500/50";
    };

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-tl from-black/80 to-black/10 dark:from-white/5 dark:to-white/30 rounded-lg animate-pulse" />
                <div className="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            <div className="relative">
                {/* Animated Emojis */}
                {animatedEmojis.map((item) => (
                    <motion.div
                        key={item.id}
                        className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none"
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{
                            opacity: 0,
                            y: -20,
                            scale: 1.2,
                            transition: { duration: 0.75, ease: "easeOut" }
                        }}
                    >
                        {item.emoji}
                    </motion.div>
                ))}

                {/* Heart Button */}
                <motion.button
                    onClick={handleClick}
                    disabled={isPending || currentUserLikes >= 3}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: currentUserLikes >= 3 ? 1 : 1.1 }}
                    className={`
            group relative block transform overflow-hidden rounded-lg cursor-pointer
            bg-gradient-to-tl from-black/80 to-black/10 p-1 shadow-lg 
            transition-all duration-300 ease-out hover:rounded-[10px] 
            focus:outline-none focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-rose-500/70 active:scale-100 active:rounded-lg 
            dark:from-white/5 dark:to-white/30 disabled:opacity-50 disabled:cursor-not-allowed
            ${isPending ? 'animate-pulse' : ''}
            ${getHoverShadow()}
          `}
                >
                    {/* Gradient Background */}
                    <div
                        className={`
              absolute inset-0 transform-gpu bg-gradient-to-tl from-purple-500 to-rose-400 
              transition-transform duration-500 ease-out
              ${getGradientTransform()}
            `}
                    />

                    {/* Heart Icon */}
                    <Icon.heart
                        className={`
              relative w-5 h-5 transform transition delay-100 duration-500 ease-out 
              group-hover:scale-110 text-rose-100
            `}
                        fill={currentUserLikes > 0 ? 'currentColor' : 'none'}
                    />
                </motion.button>
            </div>

            {/* Like Counter */}
            <div className="text-lg font-medium leading-none text-muted-foreground">
                {isPending ? (
                    <motion.div
                        className="flex space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                    </motion.div>
                ) : (
                    <motion.span
                        key={likes}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {likes}
                    </motion.span>
                )}
            </div>
        </div>
    );
}