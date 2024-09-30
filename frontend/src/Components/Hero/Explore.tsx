import { IoIosArrowDropright } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { SiCodersrank } from "react-icons/si";
import { FaSheetPlastic } from "react-icons/fa6";
import { SiGooglemeet } from "react-icons/si";
import { Link } from "react-router-dom";
const Explore = () => {
    const notesTemplate = [
        {
            icon: <FaChalkboardTeacher className="text-6xl text-indigo-600" />,
            title: "Teacher's Lesson Plan",
            desc: "Create organized lesson plans with easy-to-follow sections for topics, key takeaways, and resources.",
        },
        {
            icon: <PiStudentBold className="text-6xl text-indigo-600" />,
            title: "Student Study Notes",
            desc: "Track your learning journey with structured notes that help you review topics and concepts with ease.",
        },
        {
            icon: <SiCodersrank className="text-6xl text-indigo-600" />,
            title: "Developer Project Docs",
            desc: "Document your coding projects, API references, and workflows in a clean, readable format for easy sharing.",
        },
        {
            icon: <FaSheetPlastic className="text-3xl sm:text-6xl text-indigo-600" />,
            title: "Cheat Sheet Template",
            desc: "Compile important coding syntax, commands, or key concepts into concise cheat sheets for quick reference.",
        },
        {
            icon: <SiGooglemeet className="text-3xl sm:text-6xl text-indigo-600" />,
            title: "Meeting Notes Template",
            desc: "Keep track of important meeting discussions, decisions, and action points with this detailed meeting note template.",
        },
    ];

    return (
        <section className="sm:py-14">
            <div className="max-w-screen-xl mx-auto px-4 gap-12 md:px-8">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-600 sm:text-4xl">Explore Our Notes Templates</h3>
                    <p className="mt-3">
                        Discover the perfect note templates for teachers, students, and developers to make your work more organized and efficient.
                    </p>
                </div>
                <div>
                    <ul className="mt-6 sm:mt-12 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-stretch">
                        {notesTemplate.map((item, idx) => (
                            <li
                                key={idx}
                                className=" border-[1px] border-indigo-600 sm:p-4 rounded-lg p-2 px-4 sm:px-6 hover:bg-indigo-950/70 group cursor-pointer duration-200"
                            >
                                <div className="flex items-center justify-center text-gray-700">
                                    <button>{item.icon}</button>
                                </div>
                                <h4 className="text-gray-300 text-lg font-medium mt-2">{item.title}</h4>
                                <p className="text-gray-400 mt-1 text-sm sm:text-base">{item.desc}</p>
                                <div className="flex justify-end mt-1">
                                    <Link
                                        to={"/template"}
                                        className="flex items-center gap-1 text-sm text-indigo-400 font-medium border-[1px] px-4 py-2 rounded-lg border-indigo-700 group-hover:bg-indigo-900 group-hover:text-white duration-200"
                                    >
                                        <span>Explore</span>
                                        <IoIosArrowDropright className="text-xl font-bold" />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Explore;