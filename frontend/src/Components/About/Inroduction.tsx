const Introduction = () => {
    return (
        <div className="gap-16 text-gray-300  items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="sm:text-lg space-y-2">
                <h2 className=" text-4xl text-blue-700 font-extrabold">Welcome to MyCodingNotes</h2>
                <p className="">
                    MyCodingNotes is your go-to platform for creating, organizing, and
                    sharing notes in an efficient and user-friendly way. Whether you're
                    a developer, student, writer, or professional, MyCodingNotes
                    provides a powerful and intuitive environment to capture your
                    thoughts, document your learning, and keep all your notes neatly
                    organized.
                </p>
                <div className="mt-40">
                    <h2 className="text-4xl text-blue-700 font-extrabold mt-4 mb-1">Our Mission</h2>
                    <p>
                        At MyCodingNotes, our mission is simple: to empower users by providing a seamless note-taking experience that combines the flexibility of Markdown with the power of modern web technologies. We believe that notes are more than just text—they are ideas, insights, and knowledge that deserve a platform that keeps them accessible, organized, and secure.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <img
                    className="w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                    alt="office content 1"
                />
                <img
                    className="mt-4 w-full lg:mt-10 rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                    alt="office content 2"
                />
            </div>
        </div>
    );
};

export default Introduction;
