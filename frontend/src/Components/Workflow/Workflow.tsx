import { SiGnuprivacyguard } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdPrivacyTip } from "react-icons/md";
import { TiExport } from "react-icons/ti";

const steps = [
    {
        title: "1. Sign Up",
        description: "Start your journey by creating a free account. Signing up gives you your own dashboard where you can manage, organize, and create coding notes securely.",
        icon: <SiGnuprivacyguard className="text-3xl sm:text-6xl text-indigo-600" />,
    },
    {
        title: "2. Create a Note",
        description: "Use our powerful markdown editor to craft and format your notes with ease. Add code snippets, tags, or even embed resources like images and links.",
        icon: <IoIosCreate className="text-3xl sm:text-6xl text-indigo-600" />,
    },
    {
        title: "3. Organize Notes",
        description: "Group your notes by category, tag them for easy access, and use the search functionality to quickly find relevant notes.",
        icon: <BsFillCollectionFill className="text-3xl sm:text-6xl text-indigo-600" />,
    },
    {
        title: "4. Set Privacy",
        description: "Decide whether you want to keep your notes private for personal use or share them publicly. Perfect for teachers sharing notes or developers collaborating.",
        icon: <MdPrivacyTip className="text-3xl sm:text-6xl text-indigo-600" />,
    },
    {
        title: "5. Share or Export",
        description: "Sharing notes with peers or exporting them for offline access is quick and easy. Use shareable links or export notes as PDFs for presentations or personal archives.",
        icon: <TiExport className="text-3xl sm:text-6xl text-indigo-600" />,
    },
];
const Workflow = () => {
    return (
        <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 text-white">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-indigo-500 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                    <defs>
                        <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-blue-900">
                        <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-2xl font-semibold leading-7 text-indigo-600">How It Works ? </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Get Started with MyCodingNotes</h1>
                            <p className="mt-6 text-xl leading-8 text-gray-300">Whether you're a coding enthusiast, a teacher, or a student, MyCodingNotes makes note-taking simple, secure, and shareable. Here's a step-by-step guide on how you can begin using the platform today.</p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 sm:p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]" src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="MyCodingNotes Interface" />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-300 lg:max-w-lg">
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                {
                                    steps.map((step, ind) => {
                                        return (
                                            <li
                                                key={ind}
                                                className="flex gap-x-3 hover:border-[0.5px] border-[1px] border-transparent cursor-pointer hover:border-indigo-500 rounded-lg p-4">
                                                <span className="text-gray-400">
                                                    <span className="flex items-center gap-4">
                                                        <strong>{step.icon}</strong>
                                                        <strong className="font-semibold text-white text-xl"> {step.title} </strong>
                                                    </span>
                                                    {step.description}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <p className="mt-10 text-2xl font-bold text-indigo-500">
                                Ready to start your note-taking journey?
                            </p>
                            <p className="mt-4 text-lg font-semibold text-gray-300">
                                Get organized, stay productive, and share your knowledge with MyCodingNotes.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Workflow;
