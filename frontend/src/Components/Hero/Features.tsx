
const features = [
    { name: 'Create Notes Easily', description: 'Our editor is designed for simplicity. Format text, embed media, or even add code blocks effortlessly. Your notes, your way' },
    { name: 'Share with Anyone', description: 'Quickly share your notes with anyone via custom links. Collaborate easily, whether publicly or privately' },
    { name: 'Control Your Privacy', description: 'Keep notes private, or share them with selected people. Your content, your control.' },
    { name: 'Stay Organized', description: 'Tag, categorize, and organize notes by topics or projects. Keep your workspace neat and efficient.' },
    { name: 'Access from Anywhere', description: 'Responsive design means you can work on your notes from any device, at any time.' },
    { name: 'Collaborate (Coming Soon)', description: 'Real-time editing and comments will soon let you work together with others seamlessly.' },
]

const Features = () => {
    return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-4 px-4 py-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose MyCodingNotes?</h2>
                <p className="mt-4 ">
                At MyCodingNotes, we make it simple to create, organize, and share your knowledge. Whether you’re a Teacher, developer or a student, here’s what makes our platform stand out
                </p>

                <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 ">
                    {features.map((feature) => (
                        <div key={feature.name} className="border-[1px] rounded-lg border-gray-200 p-4 hover:bg-indigo-950/70 cursor-pointer hover:scale-105 duration-200 hover:border-indigo-700">
                            <dt className="font-medium text-blue-400 text-xl">{feature.name}</dt>
                            <dd className="mt-2 text-sm text-gray-200 ">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                <img
                    alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                    src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                    className="rounded-lg border-[1px]"
                />
                <img
                    alt="Top down view of walnut card tray with embedded magnets and card groove."
                    src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                    className="rounded-lg border-[1px]"
                />
                <img
                    alt="Side of walnut card tray with card groove and recessed card area."
                    src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                    className="rounded-lg border-[1px]"
                />
                <img
                    alt="Walnut card tray filled with cards and card angled in dedicated groove."
                    src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                    className="rounded-lg border-[1px]"
                />
            </div>
        </div>

    )
}

export default Features