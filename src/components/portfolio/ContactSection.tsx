import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Copy, Check, Linkedin, Github, Instagram, Twitter, ExternalLink } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { 
    name: "LinkedIn", 
    icon: Linkedin, 
    url: "#", 
    color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400",
    glow: "group-hover:shadow-blue-500/30",
  },
  { 
    name: "GitHub", 
    icon: Github, 
    url: "#", 
    color: "hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400",
    glow: "group-hover:shadow-purple-500/30",
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    url: "#", 
    color: "hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400",
    glow: "group-hover:shadow-pink-500/30",
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    url: "#", 
    color: "hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400",
    glow: "group-hover:shadow-cyan-500/30",
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
    <section className="relative w-full h-screen flex items-center justify-center py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.15)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(var(--secondary) / 0.12)" }}
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
          <span className="section-title">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Let's Build Something{" "}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto">
            Have a project in mind? Let's turn your ideas into reality.
          </p>
        </motion.div>

        {/* Contact Card - Zoom in animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomVariants}
          className="glass-card p-6 md:p-8 lg:p-10 max-w-xl mx-auto relative overflow-hidden"
        >
          {/* Glow pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 40px 10px hsl(var(--primary) / 0.1)",
                "0 0 0 0 hsl(var(--primary) / 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="space-y-4 relative z-10">
            {/* Email */}
            <motion.button
              onClick={() => copyToClipboard("saifdevcore@gmail.com", "email")}
              className="w-full group flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-300"
              whileHover={{ x: 5, backgroundColor: "hsl(var(--muted) / 0.5)" }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Mail size={20} className="text-primary" />
                </motion.div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm md:text-base font-semibold">saifdevcore@gmail.com</p>
                </div>
              </div>
              <motion.div 
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {copiedEmail ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} className="text-muted-foreground" />
                )}
              </motion.div>
            </motion.button>

            {/* Phone */}
            <motion.button
              onClick={() => copyToClipboard("+92 329 5129669", "phone")}
              className="w-full group flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-300"
              whileHover={{ x: 5, backgroundColor: "hsl(var(--muted) / 0.5)" }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Phone size={20} className="text-secondary" />
                </motion.div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm md:text-base font-semibold">+92 329 5129669</p>
                </div>
              </div>
              <motion.div 
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {copiedPhone ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} className="text-muted-foreground" />
                )}
              </motion.div>
            </motion.button>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl">
              <div className="p-3 rounded-xl bg-accent/10">
                <MapPin size={20} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm md:text-base font-semibold">Islamabad, Pakistan</p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="mailto:saifdevcore@gmail.com"
              className="mt-4 w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold"
              whileHover={{ scale: 1.02, boxShadow: "0 15px 30px hsl(var(--primary) / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={18} />
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
          className="mt-10 md:mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
          <div className="flex items-center justify-center gap-3 md:gap-4">
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
                className={`group p-3 md:p-4 rounded-xl bg-muted/30 border border-border/50 transition-all duration-300 ${social.color} ${social.glow} hover:shadow-lg`}
                title={social.name}
              >
                <social.icon size={20} className="md:w-6 md:h-6" />
              </motion.a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/50 mt-3">Links coming soon</p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14"
        >
          <blockquote className="text-base md:text-lg italic text-muted-foreground">
            "The future belongs to those who understand AI."
          </blockquote>
          <p className="mt-2 text-sm font-medium gradient-text">— Saif Satti</p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-14 text-xs text-muted-foreground"
        >
          <p>© 2024 Saif Satti. Built with passion and AI.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;
