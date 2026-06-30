import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const TypewriterWord = ({ defaultWord = "safer" }) => {
    const [text, setText] = React.useState(defaultWord);
    const [isBlinking, setIsBlinking] = React.useState(false);

    React.useEffect(() => {
        let isMounted = true;
        const words = [defaultWord, "stronger", "smarter"];
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const runAnimation = async () => {
            await sleep(500);

            while (isMounted) {
                for (let i = 0; i < words.length; i++) {
                    const currentWord = words[i];
                    const isSmarter = currentWord === "smarter";
                    const holdTime = isSmarter ? 1000 : 1000;

                    setIsBlinking(false);
                    await sleep(holdTime);
                    if (!isMounted) return;

                    setIsBlinking(true);
                    await sleep(200);

                    // Backspace
                    for (let j = currentWord.length; j >= 0; j--) {
                        setText(currentWord.substring(0, j));
                        await sleep(40 + Math.random() * 50);
                    }
                    if (!isMounted) return;

                    const nextWord = words[(i + 1) % words.length];
                    await sleep(300);

                    // Type
                    for (let j = 1; j <= nextWord.length; j++) {
                        setText(nextWord.substring(0, j));
                        await sleep(100 + Math.random() * 50);
                    }
                }
            }
        };

        runAnimation();
        return () => { isMounted = false; };
    }, [defaultWord]);

    return (
        <span className="inline-grid text-left text-brand-primary align-baseline relative">
            <span className="sr-only">{defaultWord}</span>
            <span aria-hidden="true" className="col-start-1 row-start-1 flex items-baseline">
                {/* Invisible static word sets natural fixed width perfectly without artificial padding */}
                <span className="invisible select-none font-bold pr-[1px]">stronger|</span>
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1 flex items-baseline relative">
                <span>{text}</span>
                <motion.span
                    animate={{ opacity: isBlinking ? [1, 0, 1] : 0 }}
                    transition={{ duration: 0.8, repeat: isBlinking ? Infinity : 0, ease: "linear" }}
                    className="inline-block font-light text-brand-primary"
                    style={{ marginLeft: '1px' }}
                >
                    |
                </motion.span>
            </span>
        </span>
    );
};

const HeroSection = ({ data }) => {
    const [imgState, setImgState] = React.useState('preferred'); // 'preferred', 'fallback', 'error'
    const [isLightMode, setIsLightMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'light' || document.documentElement.getAttribute('data-theme') === 'light';
        }
        return false;
    });

    React.useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setIsLightMode(document.documentElement.getAttribute('data-theme') === 'light');
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    const preferredAsset = isLightMode ? '/assets/light-theme-mainhero.png' : '/assets/dark-theme-mainhero.png';

    React.useEffect(() => {
        setImgState('preferred');
    }, [preferredAsset]);

    let currentSrc = null;
    if (imgState === 'preferred') {
        currentSrc = preferredAsset;
    } else if (imgState === 'fallback') {
        currentSrc = data?.backgroundImage;
    }

    if (!data) return null;

    return (
        <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-brand-black">
            {/* Background Media */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    maskImage: isLightMode
                        ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
                        : 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: isLightMode
                        ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
                        : 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
                }}
            >
                {data.backgroundVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={data.backgroundVideo} type="video/mp4" />
                    </video>
                ) : currentSrc ? (
                    <img
                        src={currentSrc}
                        alt="Hero Background"
                        className="w-full h-full object-cover object-center"
                        onError={() => {
                            if (imgState === 'preferred') {
                                setImgState('fallback');
                            } else if (imgState === 'fallback') {
                                setImgState('error');
                            }
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-brand-dark flex flex-col items-center justify-center text-white/30">
                        <ImagePlus size={32} className="mb-2 opacity-50" />
                        <span className="text-sm font-semibold tracking-widest uppercase">Add image</span>
                    </div>
                )}
                {/* Subtle Readability Overlay */}
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-[1]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-[2]"></div>
            </div>

            {/* Light Theme Transition Smoother */}
            {isLightMode && (
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--dynasas-black)] via-[var(--dynasas-dark-secondary)] to-transparent z-[1] pointer-events-none opacity-90"></div>
            )}

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white flex flex-col items-center mt-32 md:mt-16 lg:mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-4 md:mb-6 inline-block"
                >

                    {data.heroTitle && (
                        <span className="px-4 py-1 border border-white/10 rounded-full text-xs uppercase tracking-[0.2em] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] bg-black/20">
                            {data.heroTitle}
                        </span>
                    )}

                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 md:mb-6 tracking-tight max-w-4xl leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                    {data.heroSubtitle && data.heroSubtitle.includes("safer") && data.heroSubtitle.includes("for a") ? (
                        <>
                            <span className="block">
                                {data.heroSubtitle.split("for a")[0].trim()}
                            </span>
                            <span className="block">
                                for a <TypewriterWord defaultWord="safer" />
                            </span>
                            <span className="block">
                                {data.heroSubtitle.split("safer")[1].trim()}
                            </span>
                        </>
                    ) : (
                        data.heroSubtitle
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-8 md:mb-12 font-body font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                    {data.heroDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-heading relative z-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                >
                    {data.primaryCTA?.text && (
                        <Link
                            to={data.primaryCTA.link}
                            className="group bg-brand-primary text-white px-6 py-3 sm:px-8 sm:py-4 font-semibold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-3 hover:bg-brand-primary-hover hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
                        >
                            {data.primaryCTA.text}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                    {data.secondaryCTA?.text && (
                        <Link
                            to={data.secondaryCTA.link}
                            className={`px-6 py-3 sm:px-8 sm:py-4 font-semibold uppercase tracking-wider text-xs sm:text-sm border flex items-center justify-center w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 ${
                                isLightMode
                                    ? "border-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.05)] text-[#1a1a1a] hover:bg-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.3)] shadow-sm backdrop-blur-sm"
                                    : "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            }`}
                        >
                            {data.secondaryCTA.text}
                        </Link>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
