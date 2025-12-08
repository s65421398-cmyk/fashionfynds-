"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Free shipping on orders over $100!",
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day return policy for all items. Products must be unworn, unwashed, and have original tags attached. Return shipping is free for exchanges.",
  },
  {
    question: "Are all products authentic?",
    answer: "Absolutely! We only partner with verified brands and authorized retailers. Every item is guaranteed authentic or your money back.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard under 'My Orders'.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Check at checkout for details.",
  },
  {
    question: "How can I contact customer support?",
    answer: "Our support team is available 24/7 via live chat, email at support@fashionfynds.com, or phone at 1-800-FYNDS-24. Average response time is under 2 hours.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers. Can't find what you're looking for?{" "}
            <Link href="/contact" className="text-[#1BA6A6] hover:underline font-medium">
              Contact us
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq">
            <Button variant="outline" size="lg">
              View All FAQs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
