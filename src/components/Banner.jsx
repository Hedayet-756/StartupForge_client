/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

const banners = [
    {
        title: "Build Your Dream Startup Team",
        description: "Connect with visionary founders, talented developers, and creative designers to turn ideas into reality.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
        ctaText: "Browse Startups",
        ctaLink: "/browse-startups",
    },
    {
        title: "Discover Exciting Opportunities",
        description: "Explore open roles in cutting-edge startups and apply to join teams that match your skills.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
        ctaText: "Explore Opportunities",
        ctaLink: "/browse-opportunities",
    },
    {
        title: "Post Ideas & Recruit Talent",
        description: "Share your startup vision, manage team requirements, and build your core execution team seamlessly.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
        ctaText: "Get Started",
        ctaLink: "/signin",
    },
];

export default function BannerSlider() {
    const autoplay = useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    );

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        autoplay.current,
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative overflow-hidden rounded-3xl mt-4 border border-zinc-800 bg-zinc-950 shadow-2xl" ref={emblaRef}>
            <div className="flex">
                {banners.map((banner, index) => (
                    <div key={index} className="relative min-w-0 flex-[0_0_100%] h-[450px] md:h-[520px]">
                        {/* Background Image with Dark Overlay */}
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="absolute inset-0 h-full w-full object-cover brightness-50"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 max-w-4xl mx-auto z-10">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs md:text-sm font-medium mb-4 backdrop-blur-md">
                                <Rocket className="w-4 h-4" />
                                <span>StartupForge Ecosystem</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
                                {banner.title}
                            </h1>

                            <p className="text-zinc-300 text-sm md:text-lg max-w-2xl mb-8 leading-relaxed">
                                {banner.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <Link href={banner.ctaLink}>
                                    <Button className="bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all">
                                        {banner.ctaText}
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border border-zinc-700 text-white p-3 shadow-lg backdrop-blur-md hover:bg-black/80 transition-all z-20"
                aria-label="Previous Slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border border-zinc-700 text-white p-3 shadow-lg backdrop-blur-md hover:bg-black/80 transition-all z-20"
                aria-label="Next Slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-2.5 rounded-full transition-all ${selectedIndex === index ? "w-8 bg-indigo-500" : "w-2.5 bg-white/40"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}