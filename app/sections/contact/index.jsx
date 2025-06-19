import { useState, useRef } from "react";
import { LazyMotion, domAnimation, motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HeadingDivider } from "components";

export const ContactSection = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

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
            <section className="section px-2 py-8 max-w-lg mx-auto">
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
                                            className={`px-6 py-2 font-semibold rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                             'bg-gray-300 text-gray-500 cursor-not-allowed' `}
                                        >
                                            <span className="text-primary-dark">Send</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.form>
                        )}
                    </div>
                </div>
            </section>
        </LazyMotion>
    );
};
