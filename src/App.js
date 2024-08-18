import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const [sourcecode, setsourcecode] = useState("");
    const [content, setcontent] = useState("");
    const [textcharacter, setTextcharacter] = useState(0);
    const [loading, setLoading] = useState(true); // State for preloader visibility
    const [hackingText, setHackingText] = useState([]); // State for hacking text lines

    const containerRef = useRef(null); // Declare the ref here

    useEffect(() => {
        // Fetch the source code
        fetch('code.txt')
            .then((res) => res.text())
            .then((text) => {
                setsourcecode(text);
                setHackingText([
                    "Initializing quantum encryption protocols...",
                    "Just kidding! Launching your site..."
                ]);
                setLoading(true);
                // Set a timeout for the preloader
                setTimeout(() => setLoading(false), 5000); // Hide preloader after 5 seconds
            });
    }, []);

    const runscript = () => {
        setTextcharacter(textcharacter + 3);
        setcontent(sourcecode.substring(0, textcharacter));
    };

    const handlekeychanges = (e) => {
        if (e.key !== 'Escape') {
            runscript();
        }
    };

    return (
        <div>
            {loading ? (
                <div className="preloader">
                    <div className="hacking-text">
                        {hackingText.map((line, index) => (
                            <div key={index} className={`hacking-line line-${index}`}>
                                {line}
                            </div>
                        ))}
                    </div>
                    <div className="animation">
                        <div className="loading-bar"></div>
                    </div>
                </div>
            ) : (
                <div id='container' onKeyDown={handlekeychanges} tabIndex={0} ref={containerRef}>
                    <div id='source'>
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;