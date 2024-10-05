import Benefits from '@/Components/About/Benefits'
import Faqs from '@/Components/About/Faqs'
import Feature from '@/Components/About/Feature'
import Inroduction from '@/Components/About/Inroduction'
import Contact from '@/Components/Contact/Contact'
import { Helmet } from 'react-helmet-async'

const About = () => {
    return (
        <>
            <Inroduction />
            <Feature />
            <Benefits />
            <Faqs />
            <Contact />
            <Helmet>
                <title>MyCodingNotes - About</title>
                <link rel="canonical" href="https://mycodingnotes.tech/about" />
            </Helmet>
        </>
    )
}

export default About