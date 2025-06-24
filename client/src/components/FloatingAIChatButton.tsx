import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingAIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-xl w-80 h-[500px] overflow-hidden flex flex-col"
          >
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="text-center text-muted-foreground text-sm py-8">
                <p>How can I help you today?</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full p-3 pr-12 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg ${
          isOpen
            ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        } transition-colors duration-200`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
