"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatTypingIndicator from './ChatTypingIndicator';

// CuteLightRobotIcon component
const CuteLightRobotIcon = ({ size = 32, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect x="8" y="14" width="32" height="22" rx="11" fill="#f4f6fa" stroke="#b3c6e0" strokeWidth="2" />
        <rect x="18" y="36" width="12" height="6" rx="3" fill="#e3eafc" stroke="#b3c6e0" strokeWidth="1" />
        <circle cx="18" cy="25" r="3" fill="#90caf9" stroke="#1976d2" strokeWidth="1" />
        <circle cx="30" cy="25" r="3" fill="#90caf9" stroke="#1976d2" strokeWidth="1" />
        <rect x="22" y="20" width="4" height="2" rx="1" fill="#b3c6e0" />
        <rect x="23" y="8" width="2" height="6" rx="1" fill="#b3c6e0" />
        <circle cx="24" cy="8" r="2" fill="#90caf9" stroke="#1976d2" strokeWidth="1" />
        <ellipse cx="24" cy="29" rx="6" ry="2" fill="#e3eafc" />
        <rect x="12" y="18" width="4" height="2" rx="1" fill="#b3c6e0" />
        <rect x="32" y="18" width="4" height="2" rx="1" fill="#b3c6e0" />
    </svg>
);

const AVATARS = {
    bot: <CuteLightRobotIcon size={32} />, // Robot icon, 32px
    user: <span style={{fontSize:26}} title="User" role="img">🧑‍🦱</span>, // User emoji, smaller (26px)
};

const defaultWelcome = [
  { from: 'bot', text: "Hi\nI am a Steve Bayard's Beaver.\nHow can I help you?" }
];

const Chatbot = () => {
    const [messages, setMessages] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem('chatbot-messages');
            return saved ? JSON.parse(saved) : defaultWelcome;
        }
        return defaultWelcome;
    });
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [minimized, setMinimized] = useState(true);
    const [closed, setClosed] = useState(false);
    const [botTyping, setBotTyping] = useState(false);
    const inputRef = useRef(null);
    const chatRef = useRef(null);
    const chatBodyRef = useRef(null);
    const [typingText, setTypingText] = useState('');
    const typingInterval = useRef(null);
    const messagesEndRef = useRef(null);
    const [pendingBotMessage, setPendingBotMessage] = useState(null);
    const [showBottomTyping, setShowBottomTyping] = useState(false);
    const [showingFromMinimized, setShowingFromMinimized] = useState(false);
    const [copiedIdx, setCopiedIdx] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [showCursor, setShowCursor] = useState(true);
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('chatbot-messages', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (botTyping && loading) {
            let i = 0;
            const text = "Steve is typing...";
            setTypingText('');
            typingInterval.current = setInterval(() => {
                setTypingText((prev) => prev + text[i]);
                i++;
                if (i >= text.length) clearInterval(typingInterval.current);
            }, 40);
        } else {
            setTypingText('');
            if (typingInterval.current) clearInterval(typingInterval.current);
        }
        return () => {
            if (typingInterval.current) clearInterval(typingInterval.current);
        };
    }, [botTyping, loading]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, botTyping, typingText]);

    // Focus and select input after bot finishes answering
    useEffect(() => {
        if (!botTyping && !loading && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [botTyping, loading]);

    // Focus input when chat is opened (not minimized and not closed)
    useEffect(() => {
        if (!minimized && !closed && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [minimized, closed]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMessage = { from: 'user', text: input };
        setMessages((msgs) => [...msgs, userMessage]);
        setLoading(true);
        setBotTyping(true);
        setInput('');
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text, history: messages }),
            });
            const data = await res.json();
            setPendingBotMessage(data.reply || 'Sorry, I could not answer that.');
        } catch (err) {
            setPendingBotMessage('Error: Could not reach the server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pendingBotMessage !== null) {
            let i = 0;
            let display = '';
            setTypingText('');
            setBotTyping(true);
            setShowBottomTyping(true);
            let mistyping = false;
            let mistypeIdx = -1;
            typingInterval.current = setInterval(() => {
                if (!mistyping && Math.random() < 0.055 && i > 2 && i < pendingBotMessage.length - 2) {
                    const wrongChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                    display += wrongChar;
                    setTypingText(display + (showCursor ? '|' : ''));
                    mistyping = true;
                    mistypeIdx = display.length - 1;
                    setTimeout(() => {
                        display = display.slice(0, -1);
                        setTypingText(display + (showCursor ? '|' : ''));
                        setTimeout(() => {
                            display += pendingBotMessage[i];
                            setTypingText(display + (showCursor ? '|' : ''));
                            i++;
                            mistyping = false;
                            if (i >= pendingBotMessage.length) {
                                clearInterval(typingInterval.current);
                                setMessages((msgs) => [
                                    ...msgs,
                                    { from: 'bot', text: pendingBotMessage }
                                ]);
                                setBotTyping(false);
                                setPendingBotMessage(null);
                                setShowBottomTyping(false);
                            }
                        }, 120);
                    }, 180);
                } else if (!mistyping) {
                    display += pendingBotMessage[i];
                    setTypingText(display + (showCursor ? '|' : ''));
                    i++;
                    if (i >= pendingBotMessage.length) {
                        clearInterval(typingInterval.current);
                        setMessages((msgs) => [
                            ...msgs,
                            { from: 'bot', text: pendingBotMessage }
                        ]);
                        setBotTyping(false);
                        setPendingBotMessage(null);
                        setShowBottomTyping(false);
                    }
                }
            }, 28);
        }
        return () => {
            if (typingInterval.current) clearInterval(typingInterval.current);
        };
    }, [pendingBotMessage]);

    useEffect(() => {
        if (botTyping && typingText) {
            const cursorInterval = setInterval(() => {
                setShowCursor((prev) => !prev);
            }, 400);
            return () => clearInterval(cursorInterval);
        } else {
            setShowCursor(true);
        }
    }, [botTyping, typingText]);

    const handleScroll = () => {
        if (chatBodyRef.current && chatBodyRef.current.scrollTop === 0 && visibleCount < messages.length) {
            setVisibleCount((prev) => Math.min(prev + 20, messages.length));
        }
    };

    useEffect(() => {
        setShowHistory(false);
        setInitialLoading(true);
        const timer = setTimeout(() => {
            setShowHistory(true);
            setInitialLoading(false);
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    // Collapse chat when clicking outside
    useEffect(() => {
        if (!minimized && !closed) {
            const handleClick = (e) => {
                if (chatRef.current && !chatRef.current.contains(e.target)) {
                    setMinimized(true);
                }
            };
            document.addEventListener('mousedown', handleClick);
            return () => document.removeEventListener('mousedown', handleClick);
        }
    }, [minimized, closed]);

    // Scroll to bottom when chat is opened
    useEffect(() => {
        if (!minimized && !closed && chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [minimized, closed]);

    // Close chat on ESC key
    useEffect(() => {
        if (!minimized && !closed) {
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    setMinimized(true);
                }
            };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [minimized, closed]);

    if (closed) {
        return (
            <div className="fixed bottom-5 right-5 z-[1000]">
                <button
                    onClick={() => { setClosed(false); setMinimized(false); }}
                    className="rounded-full w-14 h-14 text-3xl bg-primary text-white border-none shadow-lg cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
                    title="Open chatbot"
                >
                    <span className="sr-only">Open chatbot</span>
                    <CuteLightRobotIcon size={36} />
                </button>
            </div>
        );
    }

    if (minimized) {
        return (
            <div className="fixed bottom-5 right-5 z-[1000]">
                <button
                    onClick={() => {
                        setMinimized(false);
                        setShowingFromMinimized(true);
                        setTimeout(() => setShowingFromMinimized(false), 400);
                        setTimeout(() => {
                            if (chatBodyRef.current) {
                                chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
                            }
                        }, 10);
                    }}
                    className="rounded-full w-[70px] h-[70px] text-4xl bg-gradient-to-br from-gray-100 to-primary text-white border-none shadow-2xl cursor-pointer flex items-center justify-center transition-all hover:scale-105"
                    title="Open Steve Chatbot"
                >
                    <CuteLightRobotIcon size={48} />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-5 right-5 z-[1000]">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-0 max-w-[310px] w-[310px]" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.13)' }}>
            <div
              ref={chatRef}
              className={`w-full h-[510px] flex flex-col transition-all duration-400 backdrop-blur-lg ${showingFromMinimized ? 'scale-90 opacity-30' : 'scale-100 opacity-100'}`}
              style={{ perspective: '1200px', willChange: 'transform, box-shadow' }}
            >
              {/* Header */}
              <div className="flex flex-row items-center justify-between px-4 py-2 border-b border-gray-100 bg-gradient-to-r from-gray-100 to-gray-50 rounded-t-2xl shadow-sm">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-2xl select-none"><CuteLightRobotIcon size={28} /></span>
                  <span className="font-semibold text-lg text-gray-800 tracking-wide">Steve</span>
                </div>
                <button
                  onClick={() => setClosed(true)}
                  title="Close"
                  className="bg-transparent border-none text-gray-400 p-1.5 rounded-full shadow hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="4.5" y1="4.5" x2="13.5" y2="13.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="13.5" y1="4.5" x2="4.5" y2="13.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {/* Chat Body */}
              <div
                ref={chatBodyRef}
                className="px-4 py-3 max-h-[450px] h-[450px] overflow-y-auto flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-b-2xl border-t border-gray-100 relative scrollbar-none hide-scrollbar transition-opacity duration-300"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', minHeight: 450 }}
                onScroll={handleScroll}
              >
                {!showHistory ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        {initialLoading && (
                            <div className="mt-6">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                                    <circle cx="20" cy="20" r="18" stroke="#90caf9" strokeWidth="4" opacity="0.3" />
                                    <path d="M38 20a18 18 0 0 1-18 18" stroke="#1976d2" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {messages.slice(Math.max(0, messages.length - visibleCount)).map((msg, idx, arr) => {
                            const realIdx = messages.length - visibleCount + idx;
                            return (
                                <ChatMessage
                                    key={realIdx}
                                    msg={msg}
                                    realIdx={realIdx}
                                    AVATARS={AVATARS}
                                    botTyping={botTyping}
                                    typingText={typingText}
                                    copiedIdx={copiedIdx}
                                    onCopy={(text, idx) => {
                                        navigator.clipboard.writeText(text);
                                        setCopiedIdx(idx);
                                        setTimeout(() => setCopiedIdx(null), 1200);
                                    }}
                                    androidStyle
                                />
                            );
                        })}
                        {/* Bottom typing indicator */}
                        {showBottomTyping && (
                            <ChatTypingIndicator AVATARS={AVATARS} typingText={typingText} />
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
              </div>
              {/* Input */}
              <form onSubmit={sendMessage} className="flex border-t border-gray-100 items-center px-2 py-1 bg-white rounded-b-2xl sticky bottom-0 z-10">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-none px-3 py-1.5 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 text-sm"
                  disabled={loading || botTyping}
                />
                <button
                  type="submit"
                  className="p-0 border-none bg-none cursor-pointer rounded-full ml-2 flex items-center justify-center h-8 w-8 shadow-md bg-gradient-to-br from-primary to-cyan-400 transform -rotate-12 hover:scale-110 transition-transform"
                  disabled={loading || botTyping}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: 'auto' }}>
                    <circle cx="11" cy="11" r="11" fill="#0070f3" />
                    <path d="M4 18L18 11L4 4L6 11L4 18Z" fill="#fff" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M6 11L11 11" stroke="#0070f3" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
    );
};

export default Chatbot;
