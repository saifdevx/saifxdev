import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Copy, Check, Linkedin, Github, Instagram, Twitter, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long (max 1000 chars)"),
});

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof typeof errors] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-contact-email", {
        body: { name: result.data.name, email: result.data.email, message: result.data.message },
      });

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const zoomVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative w-full min-h-[100svh] md:h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-3xl"
          style={{ background: "hsl(173 80% 40% / 0.2)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full blur-3xl"
          style={{ background: "hsl(180 65% 35% / 0.15)" }}
          animate={{ scale: [1, 1.3, 1], y: [0, -50, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="relative max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-400 mb-3 block">Get in Touch</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            Let's Build Something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">Amazing</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's turn your ideas into reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={zoomVariants}
            className="glass-card p-5 md:p-6 relative overflow-hidden border border-teal-500/20"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{ boxShadow: ["0 0 0 0 hsl(173 80% 40% / 0)", "0 0 40px 10px hsl(173 80% 40% / 0.1)", "0 0 0 0 hsl(173 80% 40% / 0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-teal-500/20 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm placeholder:text-muted-foreground/50"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-teal-500/20 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm placeholder:text-muted-foreground/50"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-teal-500/20 focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm placeholder:text-muted-foreground/50 resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white font-semibold text-sm disabled:opacity-50"
                whileHover={{ scale: 1.02, boxShadow: "0 15px 30px hsl(173 80% 40% / 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={zoomVariants}
            className="glass-card p-5 md:p-6 relative overflow-hidden border border-teal-500/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Email */}
              <motion.button
                onClick={() => copyToClipboard("saifdevcore@gmail.com", "email")}
                className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-teal-500/10 transition-all duration-300 border border-transparent hover:border-teal-500/20"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div className="p-2.5 rounded-xl bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors" whileHover={{ rotate: [0, -10, 10, 0] }}>
                    <Mail size={18} className="text-teal-400" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-[10px] text-muted-foreground">Email</p>
                    <p className="text-xs md:text-sm font-semibold">saifdevcore@gmail.com</p>
                  </div>
                </div>
                <motion.div className="p-2 rounded-lg hover:bg-muted transition-colors" whileHover={{ scale: 1.1 }}>
                  {copiedEmail ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-muted-foreground" />}
                </motion.div>
              </motion.button>

              {/* Phone */}
              <motion.button
                onClick={() => copyToClipboard("+92 329 5129669", "phone")}
                className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 border border-transparent hover:border-cyan-500/20"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" whileHover={{ rotate: [0, -10, 10, 0] }}>
                    <Phone size={18} className="text-cyan-400" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-[10px] text-muted-foreground">Phone</p>
                    <p className="text-xs md:text-sm font-semibold">+92 329 5129669</p>
                  </div>
                </div>
                <motion.div className="p-2 rounded-lg hover:bg-muted transition-colors" whileHover={{ scale: 1.1 }}>
                  {copiedPhone ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-muted-foreground" />}
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
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-xs text-muted-foreground mb-3">Connect with me</p>
              <div className="flex items-center gap-3">
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
            </div>
          </motion.div>
        </div>

        {/* Quote & Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <blockquote className="text-sm md:text-base italic text-muted-foreground">
            "The future belongs to those who understand AI."
          </blockquote>
          <p className="mt-1.5 text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">— Saif Rasheed</p>
          <p className="mt-4 text-[10px] text-muted-foreground">© 2026 Saif Rasheed. Built with passion and AI.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;