import { FaCircleArrowDown } from "react-icons/fa6";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b via-transparent to-transparent pb-12 pt-12 sm:pb-16 sm:pt-32">
            <div className="relative z-10">
                <div
                    className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                    <svg className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-80" aria-hidden="true">
                        <defs>
                            <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%"
                                patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                                <path d="M.5 200V.5H200" fill="none"></path>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" strokeWidth="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
                    </svg>
                </div>
            </div>
            <div className="relative z-20 mx-auto px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-800 via-red-500 to-indigo-800 inline-block text-transparent bg-clip-text py-2">
                        Effortless Note-taking, Anytime.
                    </h1>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-6xl text-blue-600 mt-2  bg-gradient-to-l from-blue-600 via-yellow-500 to-indigo-400 inline-block text-transparent bg-clip-text py-2">
                        Create, Organize, and Share Seamlessly.
                    </h1>
                    <h2 className="mt-6 sm:text-lg leading-8 text-gray-300">
                        Welcome to MyCodingNotes: Empowering developers to collaborate, share knowledge, and manage notes with ease.
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            onClick={() => {
                                const scrollPosition = window.innerWidth <= 840 ? 2000 : 1400;
                                window.scrollTo(0, scrollPosition);
                            }}
                            className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Get Started
                            <FaCircleArrowDown className="text-2xl text-gray-200"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
