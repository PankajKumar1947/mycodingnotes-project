import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSpam2Fill } from "react-icons/ri";

const NewsLetter = () => {
    return (
        <div className="relative isolate overflow-hidden py-8 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">
                            Subscribe to stay updated!
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-400">
                            Join our community and receive the latest notes, updates, and coding tutorials delivered to your inbox. Stay informed and enhance your coding knowledge.
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="min-w-0 flex-auto rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2 text-black shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <FaRegCalendarAlt className="text-4xl text-indigo-600" aria-hidden="true" />
                            <dt className="mt-4 text-blue-500 font-bold">Weekly Insights</dt>
                            <dd className="mt-2 leading-7 text-gray-300">
                                Get curated content, project ideas, and tutorials every week to help you stay ahead in the coding world.
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <RiSpam2Fill className="text-4xl text-indigo-600" aria-hidden="true" />
                            <dt className="mt-4 text-blue-500 font-bold">No Spam, Ever</dt>
                            <dd className="mt-2 leading-7 text-gray-300">
                                We respect your privacy. You will only receive quality content — no unnecessary emails, just valuable information.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#162573] to-[#0c0570] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
        </div>
    );
}

export default NewsLetter;
