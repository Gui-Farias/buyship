import Nave from '/buyShipCompany.webp';
import CTA from '@/shared/components/CTA';

export default function Hero() {
    return (
        <div className='pt-12 pb-24'>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className={`flex flex-col`}>
                    <h1 className="text-6xl font-bold text-(--accent)">Descubra nossas naves e experiências!</h1>
                    <p className="pt-6 text-2xl text-muted-foreground">Oferecemos naves espaciais de alta performance para transporte de carga, modelos de luxo para passeios exclusivos e experiências premium pensadas para quem busca inovação, conforto e tecnologia além da órbita.</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <CTA label="Explore Naves" to="/ships" key="ships" />
                        <CTA label="Explore Experiences" to="/experiences" key="experiences" variant="outline" />
                    </div>
                </div>

                <img src={Nave} alt="Logo" className="mix-blend-screen w-2/4 max-h-105"/>
            </div>
        </div>
    );
}