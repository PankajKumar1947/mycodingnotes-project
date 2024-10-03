import { useForm, SubmitHandler } from "react-hook-form";

type Input={
    firstname:string,
    lastname:string,
    contact:number,
    email:string,
    message:string
}
const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = async (data) => {
        console.log(data)
    }    

    return (
        <div className="isolate  px-6 py-24  lg:px-8 relative text-white">
            <div className="inset-x-0  z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-[1155/678] h-[100vh] sm:h-[80vh] w-full -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#5837d1] to-[#1405dc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>
            <div className='absolute top-8 left-1/2 -translate-x-1/2 w-full px-4'>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">Get in touch</h2>
                    <p className="mt-2 sm:text-lg leading-8 text-gray-300">We'd love to hear from you!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-xl sm:mt-10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">First name</label>
                            <div className="mt-1">
                                <input 
                                {...register('firstname', { required: true ,maxLength: 20 })}
                                type="text" placeholder='first name' autoComplete="given-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <span className='text-sm text-red-500'>{errors.firstname?.type === 'required' && "First name is required"}</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">Last name</label>
                            <div className="mt-1">
                                <input type="text"
                                    {...register('lastname', { required: true, maxLength: 20 })}
                                    placeholder='last name' autoComplete="family-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <span className='text-sm text-red-500'>{errors.lastname?.type === 'required' && "Last name is required"}</span>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">Email</label>
                            <div className="mt-1">
                                <input type="email"
                                    {...register('email', { required: true, maxLength: 30 })}
                                    placeholder='email' autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <span className='text-sm text-red-500'>{errors.email?.type === 'required' && "Email is required"}</span>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-white">Phone number</label>
                            <input 
                                {...register('contact', { required: true,minLength:10, maxLength: 10 })}
                                placeholder='phone number'
                                type="number"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <span className='text-sm text-red-500'>{errors.contact?.type === 'required' && "Phone number is required"}</span>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">Message</label>
                            <div className="mt-1">
                                <textarea 
                                {...register('message', { required: true ,minLength:5, maxLength: 300 })}
                                id="message" rows={4}
                                    placeholder='message'
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-transparent focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Let's talk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
