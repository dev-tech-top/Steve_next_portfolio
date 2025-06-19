import { useState, useRef } from "react";
import { LazyMotion, domAnimation, motion, m, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HeadingDivider } from "components";
import CalendlyWidget from "components/CalendlyWidget";

export const ContactSection = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCalendlyOpen, setCalendlyOpen] = useState(false);

    const SERVICE_ID = "service_58h6mit";
    const TEMPLATE_ID = "template_mu89okn";
    const USER_ID = "lx2sdR3vifPzAT4Mk";

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
            .send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                },
                USER_ID
            )
            .then(() => {
                setSubmitted(true);
                setLoading(false);
            })
            .catch((err) => {
                alert("Oops, something went wrong. Please try again.");
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <LazyMotion features={domAnimation}>
            <HeadingDivider title="Contact Me" />
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start w-full max-w-5xl mx-auto px-2 py-8">
                {/* Contact Form Card */}
                <section className="flex-1 min-w-[320px] max-w-lg w-full">
                    <div ref={ref} className="flex justify-center items-center min-h-[420px]">
                        <div className="w-full bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 backdrop-blur-md">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center justify-center text-center"
                                >
                                    <svg className="mb-4" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="24" fill="#e6f4ea" />
                                        <path d="M15 25l7 7 11-13" stroke="#43a047" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="text-lg font-semibold text-green-700 mb-2">Thank you for reaching out!</p>
                                    <p className="text-gray-600">Your message has been sent. I will get back to you as soon as possible.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleSubmit}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    variants={{
                                        hidden: {},
                                        visible: { transition: { staggerChildren: 0.15 } },
                                    }}
                                    className="space-y-6"
                                >
                                    <motion.div custom="left" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}>
                                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-800 bg-gray-50"
                                            placeholder="Your full name"
                                        />
                                    </motion.div>
                                    <motion.div custom="right" variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}>
                                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-800 bg-gray-50"
                                            placeholder="you@example.com"
                                        />
                                    </motion.div>
                                    <motion.div custom="bottom" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}>
                                        <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-800 bg-gray-50"
                                            placeholder="Write your message here..."
                                        />
                                    </motion.div>
                                    <motion.div custom="bottom" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}>
                                        <div className="flex justify-end">
                                            <motion.button
                                                type="submit"
                                                disabled={loading}
                                                whileHover={{ scale: loading ? 1 : 1.04 }}
                                                whileTap={{ scale: loading ? 1 : 0.97 }}
                                                className={`px-6 py-2 font-semibold rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 'bg-gray-300 text-gray-500 cursor-not-allowed' `}
                                            >
                                                <span className="text-primary-dark">Send</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.form>
                            )}
                        </div>
                    </div>
                    {/* Book a Meeting Button - centered below card */}
                    <div className="flex justify-center mt-6">
                        <m.button
                            type="button"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-100 text-blue-800 font-semibold shadow hover:bg-blue-200 transition text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                            onClick={() => setCalendlyOpen(true)}
                        >
                            {/* Calendar Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a.75.75 0 00.75-.75V6.75A2.25 2.25 0 0018 4.5H6A2.25 2.25 0 003.75 6.75v13.5c0 .414.336.75.75.75z" />
                            </svg>
                            <span>Book a Meeting</span>
                        </m.button>
                    </div>
                </section>
            </div>
            {/* Calendly Modal */}
            {isCalendlyOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="relative bg-white rounded-3xl shadow-2xl p-0 md:p-0 w-full max-w-2xl h-[600px] flex flex-col items-center overflow-hidden border border-gray-200"
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-200 transition"
                            onClick={() => setCalendlyOpen(false)}
                            aria-label="Close"
                            style={{ zIndex: 10 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="w-full h-full flex items-center justify-center p-0 md:p-6">
                            <CalendlyWidget />
                        </div>
                    </motion.div>
                </div>
            )}
        </LazyMotion>
    );
};
