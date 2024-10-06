import { SiNike } from "react-icons/si";
import { Link } from "react-router-dom";

const benefits = [
    {
        title: 'Content Creators & Writers',
        description: 'Great for drafting content, managing blogging ideas, or keeping track of creative notes. Capture inspiration as it strikes and structure your thoughts seamlessly, making your creative process more efficient.',
        image: 'https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        list: [
            'Drafting content',
            'Blogging ideas',
            'Creative notes',
            'Reference',
        ]
    },
    {
        title: 'Developers & Programmers',
        description: 'Perfect for documenting code snippets, project notes, and technical details. Easily organize and reference important information in a clear, structured format, boosting productivity in coding tasks.',
        image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        list: [
            'Code snippets',
            'Project notes',
            'Technical details',
            'Reference',
        ]
    },
    {
        title: 'Students & Researchers',
        description: 'Ideal for taking class notes, organizing research, and creating study guides. Manage all your academic content in one place, making it easy to review and prepare for exams or presentations.',
        image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        list: [
            'Class notes',
            'Research',
            'Study guides',
            'Reference',
        ]
    },
];

const Benefits = () => {
    return (
        <>
            <h1 className="text-2xl sm:text-3xl font-bold my-2 text-blue-600 text-center">Who Can Benefit ??</h1>
            <div className="p-4 sm:p-8 mx-auto max-w-screen-xl lg:py-8 lg:px-6 space-y-4 sm:space-y-0">
                {
                    benefits.map((benefit, index) => (
                        <section
                            key={index}
                            className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : ''} flex-wrap items-center justify-center sm:gap-10`}>
                            <div className="sm:w-[50%]">
                                <img
                                    src={benefit.image}
                                    alt="benefite of mycodingnotes"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="text-left max-w-lg flex-1">
                                <h2 className="text-2xl sm:text-3xl font-semibold my-2 text-indigo-500">{benefit.title}</h2>
                                <p className="mb-4">{benefit.description}</p>
                                <ul className="list-none">
                                    {
                                        benefit.list.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center mb-2">
                                                <SiNike className="text-2xl text-indigo-500 font-bold" />
                                                <span className="ml-2">{item}</span>
                                            </li>
                                        ))
                                    }

                                </ul>
                                <div className="flex justify-end">
                                    <Link to={"/notes"}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"> Let's Get Started</Link>
                                </div>
                            </div>
                        </section>
                    ))
                }
            </div>
        </>
    )
}

export default Benefits
