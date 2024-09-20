import { NavLink } from "react-router-dom";

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
                    <h1 className="text-3xl font-bold tracking-tight sm:text-6xl">
                        Your notes, your way. 
                    </h1>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-6xl text-blue-600 mt-2 sm:mt-4">
                    Create, share, and manage with ease. 
                    </h1>
                    <h2 className="mt-6 text-lg leading-8 text-gray-300">
                        Welcome to MyCodingNotes : Your Hub for Collaborative Learning!
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <NavLink to="/signup"
                            className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
