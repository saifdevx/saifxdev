import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Copy, Check, Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { 
    name: "LinkedIn", 
    icon: Linkedin, 
    url: "#", 
    color: "hover:bg-teal-500/20 hover:border-teal-500/50 hover:text-teal-400",
    glow: "group-hover:shadow-teal-500/30",
  },
  { 
    name: "GitHub", 
    icon: Github, 
    url: "#", 
    color: "hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400",
    glow: "group-hover:shadow-cyan-500/30",
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    url: "#", 
    color: "hover:bg-teal-400/20 hover:border-teal-400/50 hover:text-teal-300",
    glow: "group-hover:shadow-teal-400/30",
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    url: "#", 
    color: "hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:text-cyan-300",
    glow: "group-hover:shadow-cyan-400/30",
  },
];

const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Zoom in with elastic bounce animation
  const zoomVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative w-full h-full md:h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
      {/* Teal themed background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(173 80% 40% / 0.2)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-3xl"
          style={{ background: "hsl(180 65% 35% / 0.15)" }}
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -50, 0],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="relative max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-400 mb-3 block">Get in Touch</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Let's Build Something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">Amazing</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
            Have a project in mind? Let's turn your ideas into reality.
          </p>
        </motion.div>

        {/* Contact Card - Zoom in animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomVariants}
          className="glass-card p-5 md:p-6 lg:p-8 max-w-xl mx-auto relative overflow-hidden border border-teal-500/20"
        >
          {/* Glow pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(173 80% 40% / 0)",
                "0 0 40px 10px hsl(173 80% 40% / 0.1)",
                "0 0 0 0 hsl(173 80% 40% / 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="space-y-3 relative z-10">
            {/* Email */}
            <motion.button
              onClick={() => copyToClipboard("saifdevcore@gmail.com", "email")}
              className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-teal-500/10 transition-all duration-300 border border-transparent hover:border-teal-500/20"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2.5 rounded-xl bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Mail size={18} className="text-teal-400" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground">Email</p>
                  <p className="text-xs md:text-sm font-semibold">saifdevcore@gmail.com</p>
                </div>
              </div>
              <motion.div 
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {copiedEmail ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} className="text-muted-foreground" />
                )}
              </motion.div>
            </motion.button>

            {/* Phone */}
            <motion.button
              onClick={() => copyToClipboard("+92 329 5129669", "phone")}
              className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/20"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Phone size={18} className="text-cyan-400" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground">Phone</p>
                  <p className="text-xs md:text-sm font-semibold">+92 329 5129669</p>
                </div>
              </div>
              <motion.div 
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {copiedPhone ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} className="text-muted-foreground" />
                )}
              </motion.div>
            </motion.button>

            {/* Location */}
            <div className="flex items-center gap-3 p-3 rounded-xl">
              <div className="p-2.5 rounded-xl bg-teal-400/10">
                <MapPin size={18} className="text-teal-300" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground">Location</p>
                <p className="text-xs md:text-sm font-semibold">Islamabad, Pakistan</p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="mailto:saifdevcore@gmail.com"
              className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white font-semibold text-sm"
              whileHover={{ scale: 1.02, boxShadow: "0 15px 30px hsl(173 80% 40% / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={16} />
              Send Message
            </motion.a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <p className="text-xs text-muted-foreground mb-3">Connect with me</p>
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`group p-3 rounded-xl bg-muted/30 border border-teal-500/20 transition-all duration-300 ${social.color} ${social.glow} hover:shadow-lg`}
                title={social.name}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/50 mt-2">Links coming soon</p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <blockquote className="text-sm md:text-base italic text-muted-foreground">
            "The future belongs to those who understand AI."
          </blockquote>
          <p className="mt-1.5 text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">— Saif Satti</p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-[10px] text-muted-foreground"
        >
          <p>© 2024 Saif Satti. Built with passion and AI.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;