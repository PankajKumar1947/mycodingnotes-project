import { useState } from 'react';
import { LuPlusCircle } from "react-icons/lu";
import { LuMinusCircle } from "react-icons/lu";

const Faqs = () => {
    const faqsList = [
        {
            q: "What is MyCodingNotes?",
            a: "MyCodingNotes is a web platform where users can create notes, share them with others, and keep them private if desired. It offers a markdown editor with live preview to format notes efficiently."
        },
        {
            q: "How can I create notes on MyCodingNotes?",
            a: "You can create notes by signing up for an account, then using the markdown editor to write and format your notes. The notes can be saved across multiple pages and shared with others."
        },
        {
            q: "Is MyCodingNotes secure?",
            a: "Yes, MyCodingNotes ensures that all user-created notes are securely stored. Users have full control over whether their notes are private or shared."
        },
        {
            q: "Can I use MyCodingNotes to collaborate on notes?",
            a: "Currently, MyCodingNotes focuses on individual note creation and sharing. While collaboration features aren’t available yet, you can share your notes with others via links."
        },
        {
            q: "What makes MyCodingNotes different from other note-taking apps?",
            a: "MyCodingNotes is tailored for coding enthusiasts, offering markdown support, multi-page notes, and the ability to share notes publicly or keep them private. It’s lightweight, user-friendly, and built with a developer mindset."
        }
    ];
    

    const [expanded, setExpanded] = useState(null);

    const toggleAnswer = (index:any) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <section className="leading-relaxed max-w-screen-xl my-12 mx-auto px-4 md:px-8 sm:mb-20">
            <div className="space-y-3 text-center">
                <h1 className="text-2xl sm:text-3xl text-blue-600 font-bold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-200 sm:text-lg">
                    Answered all frequently asked questions. Still confused? Feel free to contact us.
                </p>
            </div>
            <div className="mt-4 sm:mt-10 max-w-2xl mx-auto">
                {faqsList.map((item, idx) => (
                    <div key={idx} className=" py-2">
                        <button
                            onClick={() => toggleAnswer(idx)}
                            className="flex justify-between items-center w-full text-left  font-medium focus:outline-none"
                        >
                            <span className='sm:text-lg font-semibold'>{item.q}</span>
                            <span className='text-2xl font-bold text-indigo-500'>{expanded === idx ? <LuMinusCircle /> : <LuPlusCircle />}</span>
                        </button>
                        {expanded === idx && (
                            <div className="pl-4 text-gray-300 text-sm sm:text-base">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faqs;
