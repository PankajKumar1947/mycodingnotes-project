import { IoIosCreate } from "react-icons/io";
import { MdOutlineLaptop } from "react-icons/md";
import { SiFsecure } from "react-icons/si";
import { SiPowerpages } from "react-icons/si";
import { FaShareSquare } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const features = [
    {
        name: 'Markdown Preview',
        desc: 'Effortlessly create and preview notes using Markdown, complete with real-time formatting that allows you to see exactly how your notes will appear when shared.',
        icon: <IoIosCreate className="text-4xl text-indigo-600" />,
    },
    {
        name: 'User-Friendly Interface',
        desc: 'Experience an intuitive design that simplifies navigation, making it easy for users to create, organize, and manage their notes without any hassle.',
        icon: <MdOutlineLaptop className="text-4xl text-indigo-600" />,
    },
    {
        name: 'Secure Note Storage',
        desc: 'Rest assured that your notes are stored securely with robust encryption methods, ensuring that only you have access to your valuable content.',
        icon: <SiFsecure className="text-4xl text-indigo-600" />,
    },
    {
        name: 'Multi-Page Notes',
        desc: 'Organize your thoughts and ideas efficiently by creating notes across multiple pages, making it easy to manage different topics or projects without confusion.',
        icon: <SiPowerpages className="text-4xl text-indigo-600" />,
    },
    {
        name: 'Shareable Notes',
        desc: 'Collaborate effortlessly by sharing your notes through secure public or private links, allowing you to control who can view or edit your content.',
        icon: <FaShareSquare className="text-4xl text-indigo-600" />,
    },
    {
        name: 'Personalised Dashboard',
        desc: 'Stay on top of your notes with a personalized dashboard that provides insights and tools to help you stay organized and focused.',
        icon: <MdDashboard className="text-4xl text-indigo-600" />,
    },
];

const Feature = () => {
    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
                <div className="max-w-2xl mx-auto">
                    <h3 className=" text-3xl font-bold sm:text-4xl text-blue-600">Key <span className="bg-gradient-to-r from-blue-600 via-green-500 to-red-500 inline-block text-transparent bg-clip-text py-1">Features</span> </h3>
                    <p className="mt-3 sm:text-lg">
                        Transform the way you code, create, and collaborate with MyCodingNotes.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="space-y-3 border-[1px] rounded-lg p-4 border-indigo-700 bg-indigo-950/40 hover:bg-indigo-950 cursor-pointer hover:scale-105 duration-200 ">
                                    <div className="mx-auto flex items-center justify-center">
                                        <p className="bg-indigo-100 text-indigo-600 rounded-full p-3">{item.icon}</p>
                                    </div>
                                    <h4 className="text-lg text-indigo-500 font-semibold">{item.name}</h4>
                                    <p>{item.desc}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Feature