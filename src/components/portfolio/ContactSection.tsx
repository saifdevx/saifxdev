import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Copy, Check } from "lucide-react";
import { useState } from "react";

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

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 md:pt-28 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.2)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-52 md:w-80 h-52 md:h-80 rounded-full blur-3xl"
          style={{ background: "hsl(var(--secondary) / 0.15)" }}
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
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
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            Let's Build Something{" "}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Ready to discuss your next project? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card p-5 md:p-8 lg:p-12 max-w-2xl mx-auto"
        >
          <div className="space-y-3 md:space-y-6">
            {/* Email */}
            <motion.button
              onClick={() => copyToClipboard("saifdevcore@gmail.com", "email")}
              className="w-full group flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-muted/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="md:w-6 md:h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] md:text-sm text-muted-foreground">Email</p>
                  <p className="text-sm md:text-base font-semibold break-all">saifdevcore@gmail.com</p>
                </div>
              </div>
              <div className="p-1.5 md:p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0">
                {copiedEmail ? (
                  <Check size={16} className="md:w-5 md:h-5 text-green-500" />
                ) : (
                  <Copy size={16} className="md:w-5 md:h-5 text-muted-foreground" />
                )}
              </div>
            </motion.button>

            {/* Phone */}
            <motion.button
              onClick={() => copyToClipboard("+92 329 5129669", "phone")}
              className="w-full group flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-muted/50 transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Phone size={18} className="md:w-6 md:h-6 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] md:text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm md:text-base font-semibold">+92 329 5129669</p>
                </div>
              </div>
              <div className="p-1.5 md:p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0">
                {copiedPhone ? (
                  <Check size={16} className="md:w-5 md:h-5 text-green-500" />
                ) : (
                  <Copy size={16} className="md:w-5 md:h-5 text-muted-foreground" />
                )}
              </div>
            </motion.button>

            {/* Location */}
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl">
              <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-accent/10">
                <MapPin size={18} className="md:w-6 md:h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-[10px] md:text-sm text-muted-foreground">Location</p>
                <p className="text-sm md:text-base font-semibold">Islamabad, Pakistan</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href="mailto:saifdevcore@gmail.com"
            className="mt-6 md:mt-8 w-full flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold text-base md:text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send size={18} className="md:w-5 md:h-5" />
            Send Message
          </motion.a>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12"
        >
          <blockquote className="text-base md:text-lg lg:text-xl italic text-muted-foreground px-4">
            "The future belongs to those who understand AI."
          </blockquote>
          <p className="mt-2 text-xs md:text-sm font-medium gradient-text">— Saif Satti</p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-xs md:text-sm text-muted-foreground"
        >
          <p>© 2024 Saif Satti. Built with passion and AI.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ContactSection;
