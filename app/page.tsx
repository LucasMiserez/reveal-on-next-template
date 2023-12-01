import dynamic from 'next/dynamic';

const Presentation = dynamic(() => import('../components/Presentation'), { ssr: false });

export default function Home() {

    return (<Presentation
            secret={null}
            src="/presentation-tsx.html" />
    );
}
