import Explore from '@/Components/Hero/Explore'
import { Helmet } from 'react-helmet-async'

const Template = () => {
    return (
        <>
            <Helmet>
                <title>Notes Template</title>
                <link rel="canonical" href="https://mycodingnotes.tech/template" />
            </Helmet>
            <Explore />
        </>
    )
}

export default Template