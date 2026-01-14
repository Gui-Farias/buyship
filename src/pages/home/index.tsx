import Hero from './components/hero';
import BestShips from './components/bestShips';
import PartnersSection from './components/partners';
import Highlight from './components/highlight';
import ExperiencesSection from './components/experiences';

export default function Home() {
    return (
        <div>
            <Hero/>
            <BestShips/>
            <PartnersSection/>
            <Highlight/>
            <ExperiencesSection/>
        </div>
    );
};