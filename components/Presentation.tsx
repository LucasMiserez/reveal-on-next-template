'use client';

import { useEffect } from 'react';

import RevealJS from 'reveal.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import PresentationContent from './PresentationContent';

export default function Presentation({ secret, src }: { secret: string | null, src: string }) {
    let reveal: Reveal.Api;
    let initialised: boolean = false;

    useEffect(() => {
        if (!window.Reveal) {
            reveal = new RevealJS({
                embedded: true,
                plugins: [ ],
            });
            // @ts-ignore
            window.Reveal = reveal;
        }
    }, []);

    const onContentReady = () => {
        console.log('content ready');
        if (!initialised) {
            initialised = true;
            reveal.initialize(); 
        } else { 
            reveal.sync();
        }
    };

    return (<>
        <div className="reveal" style={{ width: '100%', flexGrow: 1, border: 'solid 1px black' }}>
            <div className="slides">
                <PresentationContent src={src} onLoaded={onContentReady} />
            </div>
        </div>
    </>);
};
