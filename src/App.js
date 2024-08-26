import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { signInWithGoogle, logOut, auth } from './Firebase';
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [sourcecode, setsourcecode] = useState("");
    const [content, setcontent] = useState("");
    const [textcharacter, setTextcharacter] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hackingText, setHackingText] = useState([]);
    const [showTypingPrompt, setShowTypingPrompt] = useState(false);
    const [user, setUser] = useState(null);

    const containerRef = useRef(null);

    useEffect(() => {
        fetch('code.txt')
            .then((res) => res.text())
            .then((text) => {
                setsourcecode(text);
                setHackingText([
                    "Initializing quantum encryption protocols...",
                    "Just kidding! Launching your site..."
                ]);
                setLoading(true);
                setTimeout(() => setLoading(false), 5000);
            });
    }, []);

    useEffect(() => {
        if (!loading && containerRef.current) {
            containerRef.current.focus();
            setShowTypingPrompt(true);
            setTimeout(() => setShowTypingPrompt(false), 3000);
        }
    }, [loading]);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && !localStorage.getItem('loginToastShown')) {
                toast.success(`Welcome ${currentUser.displayName}!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                localStorage.setItem('loginToastShown', 'true');
            }
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

    const clearContent = () => {
        setcontent("");
        setTextcharacter(0);
    };

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
            toast.info("You have logged out successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            localStorage.removeItem('loginToastShown'); // Reset the toast shown flag on logout
        } catch (error) {
            console.error("Error during logout", error);
        }
    };

    return (
        <div>
            <ToastContainer />
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
                    {showTypingPrompt && (
                        <div className="typing-prompt">
                            You can start typing anything!
                        </div>
                    )}
                    <button className="clear-button" onClick={clearContent}>
                        Clear
                    </button>
                    <div className="auth-buttons">
                        {user ? (
                            <>
                                <span className="user-name">{user.displayName}</span>
                                <img src={user.photoURL} alt="Profile" className="profile-icon" />
                                <button className="auth-button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button className="auth-button" onClick={handleLogin}>
                                Login with Google
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;