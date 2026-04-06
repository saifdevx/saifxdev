import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! 👋 I'm Saif's AI assistant. Ask me anything about his skills, services, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages.filter(m => m.role === "user" || m.role === "assistant").slice(-10) }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);

          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble right now. Please try again or contact Saif directly at saifdevcore@gmail.com" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Neon Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_hsl(217_91%_60%/0.4),0_0_40px_hsl(217_91%_60%/0.2)] my-[28px] px-[10px] py-[10px]"
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px hsl(217 91% 60% / 0.6), 0 0 60px hsl(217 91% 60% / 0.3)" }}
        whileTap={{ scale: 0.9 }}
        animate={{ boxShadow: [
          "0 0 20px hsl(217 91% 60% / 0.4), 0 0 40px hsl(217 91% 60% / 0.2)",
          "0 0 30px hsl(217 91% 60% / 0.6), 0 0 60px hsl(217 91% 60% / 0.3)",
          "0 0 20px hsl(217 91% 60% / 0.4), 0 0 40px hsl(217 91% 60% / 0.2)",
        ]}}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] h-[480px] rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/30 flex flex-col bg-background/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <Bot size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">Saif's AI Assistant</p>
                <p className="text-[10px] text-muted-foreground">Ask about skills, services & more</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} className="text-blue-400" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-muted/50 border border-border/50 rounded-bl-md"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_p]:text-xs">
                        <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={12} className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-blue-400" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-muted/50 border border-border/50 rounded-bl-md">
                    <Loader2 size={14} className="animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Saif..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-xs focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground/50"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 rounded-xl bg-blue-500 text-white disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
