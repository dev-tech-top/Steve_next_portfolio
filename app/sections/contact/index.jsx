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

    // Animation variants
    const container = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 },
        },
    };

    const item = {
        hidden: (direction) => {
            switch (direction) {
                case "left":
                    return { opacity: 0, x: -50 };
                case "right":
                    return { opacity: 0, x: 50 };
                case "bottom":
                    return { opacity: 0, y: 50 };
                default:
                    return { opacity: 0 };
            }
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

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
            <section id="tech" className="section px-4 py-8 max-w-md mx-auto">
                <HeadingDivider title="Contact Me" />
                <div ref={ref}>
                    {submitted ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5 }}
                            className="text-center text-green-600 font-semibold mt-8"
                        >
                            Thank you for reaching out! I'll get back to you soon.
                        </motion.p>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={container}
                            className="space-y-6"
                        >
                            <motion.div custom="left" variants={item}>
                                <label
                                    htmlFor="name"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Your full name"
                                />
                            </motion.div>

                            <motion.div custom="right" variants={item}>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="you@example.com"
                                />
                            </motion.div>

                            <motion.div custom="bottom" variants={item}>
                                <label
                                    htmlFor="message"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Write your message here..."
                                />
                            </motion.div>

                            <motion.div custom="bottom" variants={item}>
                                <div className="flex justify-end">
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: loading ? 1 : 1.05 }}
                                        whileTap={{ scale: loading ? 1 : 0.95 }}
                                        className={`px-5 py-2 font-semibold rounded-lg shadow-md transition ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                    >
                                        {loading ? "Sending..." : "Send"}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.form>
                    )}
                </div>
            </section>
        </LazyMotion>
    );
};
