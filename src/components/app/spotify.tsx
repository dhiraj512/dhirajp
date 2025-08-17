"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import Icon from '../ui/icon'
import { getCurrentlyPlaying, getRecentTrack, type NowPlayingTrack, type RecentTrack } from '@/lib/actions/spotify'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { Skeleton } from '../ui/skeleton'
import { formatLength } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

export default function Spotify() {
    const [nowPlaying, setNowPlaying] = useState<NowPlayingTrack | null>(null)
    const [recentTrack, setRecentTrack] = useState<RecentTrack | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [nowPlayingData, recentTrackData] = await Promise.all([
                    getCurrentlyPlaying(),
                    getRecentTrack()
                ])

                setNowPlaying(nowPlayingData)
                setRecentTrack(recentTrackData)
            } catch (error) {
                console.error('Error fetching Spotify data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()

        // Set up periodic refresh every 15 seconds
        const intervalId = setInterval(() => {
            fetchData()
        }, 15000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <SpotifySkeleton />
                </motion.div>
            ) : nowPlaying?.isPlaying ? (
                <motion.div
                    key="now-playing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="inline-flex items-center gap-2">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0, -5, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        >
                            <Icon.spotify className="size-4 text-neon-green" />
                        </motion.div>
                        <h2 className="font-semibold text-base">
                            Now playing
                        </h2>
                    </div>
                    <NowPlaying nowPlaying={nowPlaying} />
                </motion.div>
            ) : recentTrack ? (
                <motion.div
                    key="last-played"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="inline-flex items-center gap-2">
                        <Icon.spotify className="size-4 text-neon-green" />
                        <h2 className="font-semibold text-base">
                            Last played
                        </h2>
                    </div>
                    <RecentlyPlayedCard recentTrack={recentTrack} />
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}

const RecentlyPlayedCard = ({ recentTrack }: { recentTrack: RecentTrack }) => {
    return (
        <AnimatePresence>
            <Card className="w-full max-w-xs my-2 rounded-lg bg-opacity-10 backdrop-blur-sm z-0 relative">
                <Image
                    src={recentTrack.albumImageUrl}
                    alt="Album Art"
                    width={60}
                    height={60}
                    className="size-full -z-10 object-cover opacity-20 blur-[2px] rounded-md absolute"
                />
                <div className="grid grid-cols-[60px_1fr] gap-2 items-center p-1.5">
                    <motion.div
                        className="relative overflow-hidden rounded-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src={recentTrack.albumImageUrl}
                            alt="Album Art"
                            width={60}
                            height={60}
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </motion.div>
                    <div className="space-y-0.5">
                        <motion.h3
                            className="font-semibold line-clamp-1"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Link href={recentTrack.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {recentTrack.title}
                            </Link>
                        </motion.h3>
                        <motion.p
                            className="text-xs line-clamp-1 text-muted-foreground"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            {recentTrack.artist}
                        </motion.p>
                        <motion.div
                            className="flex items-center gap-1 text-xs text-muted-foreground"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <Icon.clock className="size-3" />
                            <span>
                                Played {
                                    recentTrack?.playedAt
                                        ? formatDistanceToNow(parseISO(recentTrack.playedAt), { addSuffix: true })
                                        : "recently"
                                }
                            </span>
                        </motion.div>
                    </div>
                </div>
            </Card>
        </AnimatePresence>
    )
}

const NowPlaying = ({ nowPlaying }: { nowPlaying: NowPlayingTrack }) => {
    const [currentProgress, setCurrentProgress] = useState(nowPlaying.progress)
    const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
    const lastUpdateTimeRef = useRef<number>(Date.now())

    // Initialize progress on component mount or when track changes
    useEffect(() => {
        if (nowPlaying?.isPlaying) {
            setCurrentProgress(nowPlaying.progress)
            lastUpdateTimeRef.current = Date.now()

            // Clear any existing interval
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current)
            }

            // Start progress timer that updates every 100ms for smooth animation
            progressTimerRef.current = setInterval(() => {
                const now = Date.now()
                const timePassed = now - lastUpdateTimeRef.current
                lastUpdateTimeRef.current = now

                setCurrentProgress(prev => {
                    const newProgress = prev + timePassed
                    // Reset when we reach the end of the track
                    return newProgress >= nowPlaying.duration ? nowPlaying.duration : newProgress
                })
            }, 100)
        }

        return () => {
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current)
            }
        }
    }, [nowPlaying])

    // Need to ensure we cap the progress at the duration
    const displayProgress = Math.min(currentProgress, nowPlaying.duration)
    const progressPercentage = (displayProgress / nowPlaying.duration) * 100

    return (
        <Card className="w-full max-w-xs my-2 rounded-lg bg-opacity-10 backdrop-blur-sm z-0 relative">
            <Image
                src={nowPlaying.albumImageUrl}
                alt="Album Art"
                width={60}
                height={60}
                className="size-full -z-10 object-cover opacity-20 blur-[2px] rounded-md absolute"
            />
            <div className="grid grid-cols-[60px_1fr] gap-2 items-center p-1.5">
                <motion.div
                    className="relative overflow-hidden rounded-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src={nowPlaying.albumImageUrl}
                        alt="Album Art"
                        width={60}
                        height={60}
                        className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
                </motion.div>
                <div className="space-y-0.5">
                    <motion.h3
                        className="font-semibold line-clamp-1"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <Link href={nowPlaying.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            {nowPlaying.title}
                        </Link>
                    </motion.h3>
                    <motion.p
                        className="text-xs line-clamp-1 text-muted-foreground"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        {nowPlaying.artist}
                    </motion.p>
                    <motion.div
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <span>{formatLength(displayProgress)}</span>
                        <div className='bg-primary/20 rounded-full h-1 w-full overflow-hidden'>
                            <motion.div
                                className='bg-neon-green h-1'
                                style={{
                                    width: `${progressPercentage}%`
                                }}
                                transition={{
                                    duration: 0.1,
                                    ease: "linear"
                                }}
                            />
                        </div>
                        <span>{formatLength(nowPlaying.duration)}</span>
                    </motion.div>
                </div>
            </div >
        </Card >
    )
}

const SpotifySkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2"
        >
            <div className="inline-flex items-center gap-2">
                <Skeleton className="h-6 w-[150px]" />
            </div>
            <Skeleton className="w-full sm:max-w-xs h-20 rounded-md">
                <div className='grid grid-cols-[60px_1fr] gap-4 items-center size-full p-3'>
                    <Skeleton className='rounded-sm w-14 h-full' />
                    <div className='space-y-1'>
                        <Skeleton className='w-44 h-4' />
                        <Skeleton className='w-32 h-3' />
                        <Skeleton className='w-48 h-3' />
                    </div>
                </div>
            </Skeleton>
        </motion.div>
    )
}