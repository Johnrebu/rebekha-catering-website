import { useState } from "react";
import { Search, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type FAQItem = {
  question: string;
  answer: string;
};

const defaultFaqs: FAQItem[] = [
  {
    question: "How do I contact support?",
    answer: "Use the support form or live chat to reach our team.",
  },
  {
    question: "Where can I find documentation?",
    answer: "Documentation is available in the Docs section of our website.",
  },
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot password?' on the sign-in page to reset it.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, new users receive a 14-day free trial.",
  },
];

export interface FAQBlockProps {
  faqs?: FAQItem[];
  suggestions?: FAQItem[];
  searchPlaceholder?: string;
  suggestionsTitle?: string;
  className?: string;
  getAiResponse?: (question: string) => string;
}

const FAQBlock = ({
  faqs = defaultFaqs,
  suggestions,
  searchPlaceholder = "Search FAQs...",
  suggestionsTitle = "Popular follow-up questions",
  className,
  getAiResponse,
}: FAQBlockProps) => {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<
    Record<string, "up" | "down" | undefined>
  >({});
  const [showFeedbackInput, setShowFeedbackInput] = useState<
    Record<string, boolean>
  >({});
  const [feedbackText, setFeedbackText] = useState<Record<string, string>>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<
    Record<string, boolean>
  >({});
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  const featuredFaqs = (suggestions?.length ? suggestions : faqs).slice(0, 3);

  const handleFeedback = (question: string, type: "up" | "down") => {
    setFeedback((current) => ({ ...current, [question]: type }));
    setSubmittedFeedback((current) => ({ ...current, [question]: false }));
    setShowFeedbackInput((current) => ({
      ...current,
      [question]: type === "down",
    }));
  };

  const handleFeedbackSubmit = (question: string) => {
    setSubmittedFeedback((current) => ({ ...current, [question]: true }));
    setShowFeedbackInput((current) => ({ ...current, [question]: false }));
    setFeedbackText((current) => ({ ...current, [question]: "" }));
  };

  const handleAiAsk = () => {
    const question = aiInput.trim();
    if (!question) {
      return;
    }

    setAiLoading(true);
    setAiResponse("");

    globalThis.setTimeout(() => {
      setAiResponse(
        getAiResponse?.(question) ??
          `We do not have an exact FAQ match for "${question}" yet. Share your event date, guest count, and menu preference with our team for a tailored answer.`,
      );
      setAiLoading(false);
    }, 1200);
  };

  const suggestionButtonClasses =
    "rounded-full border border-[hsl(40,20%,85%)] bg-white px-3 py-2 text-left text-sm text-[hsl(30,10%,35%)] transition-colors hover:border-[hsl(43,76%,58%)] hover:text-[hsl(30,20%,15%)]";

  return (
    <Card
      className={cn(
        "overflow-hidden border-[hsl(40,20%,85%)] bg-white/95 shadow-[0_32px_75px_-45px_rgba(58,39,12,0.48)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="h-1.5 bg-gradient-to-r from-[hsl(43,76%,58%)] via-[hsl(38,70%,45%)] to-[hsl(43,76%,58%)]" />
      <CardContent className="space-y-6 p-5 sm:p-7">
        <div className="space-y-2">
          <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(38,70%,45%)]">
            FAQ Assistant
          </p>
          <h3 className="text-3xl text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
            Search answers in seconds.
          </h3>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(30,10%,45%)]" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-12 rounded-none border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] pl-11 text-[0.95rem] text-[hsl(30,20%,15%)] placeholder:text-[hsl(30,10%,55%)] focus-visible:ring-[hsl(43,76%,58%)]"
          />
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="rounded-none border border-dashed border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-[hsl(30,20%,15%)]">
              <Sparkles className="h-4 w-4 text-[hsl(43,76%,58%)]" />
              Ask for a custom answer
            </div>
            <p className="mt-2 text-sm text-[hsl(30,10%,45%)]">
              No exact match came up. Ask your question and we will guide you.
            </p>
            <Textarea
              value={aiInput}
              onChange={(event) => {
                setAiInput(event.target.value);
                setAiResponse("");
              }}
              placeholder="Type your catering question..."
              rows={3}
              className="mt-4 rounded-none border-[hsl(40,20%,85%)] bg-white text-[hsl(30,20%,15%)] placeholder:text-[hsl(30,10%,55%)] focus-visible:ring-[hsl(43,76%,58%)]"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.24em] text-[hsl(30,10%,45%)]">
                Tailored guidance
              </span>
              <Button
                type="button"
                onClick={handleAiAsk}
                disabled={aiLoading || !aiInput.trim()}
                className="rounded-none border border-[hsl(43,76%,58%)] bg-[hsl(43,76%,58%)] px-5 text-[hsl(30,20%,15%)] hover:bg-[hsl(38,70%,45%)] hover:text-[hsl(30,20%,15%)]"
              >
                {aiLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                    Thinking
                  </>
                ) : (
                  "Ask Now"
                )}
              </Button>
            </div>
            {aiResponse ? (
              <div className="mt-4 border border-[hsl(40,20%,85%)] bg-white p-4 text-sm leading-relaxed text-[hsl(30,10%,35%)]">
                {aiResponse}
              </div>
            ) : null}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="overflow-hidden border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,97%)] px-0 data-[state=open]:bg-white"
              >
                <AccordionTrigger className="px-5 py-4 text-left hover:no-underline">
                  <span className="pr-4 text-left text-base leading-snug text-[hsl(30,20%,15%)] [font-family:'Cormorant_Garamond',serif]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-[hsl(30,10%,35%)]">
                  <div className="space-y-4">
                    <p className="leading-relaxed">{faq.answer}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-[hsl(30,10%,45%)]">
                        Helpful?
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-full border px-3 text-[hsl(30,10%,45%)] hover:border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)]/10 hover:text-[hsl(30,20%,15%)]",
                          feedback[faq.question] === "up"
                            ? "border-[hsl(43,76%,58%)] bg-[hsl(43,76%,58%)]/10 text-[hsl(30,20%,15%)]"
                            : "border-[hsl(40,20%,85%)] bg-white",
                        )}
                        onClick={() => handleFeedback(faq.question, "up")}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        Yes
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-full border px-3 text-[hsl(30,10%,45%)] hover:border-[hsl(43,76%,58%)] hover:bg-[hsl(43,76%,58%)]/10 hover:text-[hsl(30,20%,15%)]",
                          feedback[faq.question] === "down"
                            ? "border-[hsl(43,76%,58%)] bg-[hsl(43,76%,58%)]/10 text-[hsl(30,20%,15%)]"
                            : "border-[hsl(40,20%,85%)] bg-white",
                        )}
                        onClick={() => handleFeedback(faq.question, "down")}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        Needs more
                      </Button>
                      {feedback[faq.question] === "up" ? (
                        <span className="text-xs text-[hsl(38,70%,45%)]">
                          Thanks for the feedback.
                        </span>
                      ) : null}
                      {submittedFeedback[faq.question] ? (
                        <span className="text-xs text-[hsl(38,70%,45%)]">
                          We will use this to improve the answer.
                        </span>
                      ) : null}
                    </div>
                    {showFeedbackInput[faq.question] ? (
                      <div className="space-y-3 border-t border-[hsl(40,20%,85%)] pt-4">
                        <Textarea
                          value={feedbackText[faq.question] ?? ""}
                          onChange={(event) =>
                            setFeedbackText((current) => ({
                              ...current,
                              [faq.question]: event.target.value,
                            }))
                          }
                          rows={3}
                          placeholder="What would have made this answer more useful?"
                          className="rounded-none border-[hsl(40,20%,85%)] bg-white text-[hsl(30,20%,15%)] placeholder:text-[hsl(30,10%,55%)] focus-visible:ring-[hsl(43,76%,58%)]"
                        />
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleFeedbackSubmit(faq.question)}
                            className="rounded-none border border-[hsl(43,76%,58%)] bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] hover:bg-[hsl(38,70%,45%)] hover:text-[hsl(30,20%,15%)]"
                          >
                            Submit Feedback
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="border-t border-[hsl(40,20%,85%)] pt-5">
          <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[hsl(38,70%,45%)]">
            {suggestionsTitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {featuredFaqs.map((faq) => (
              <button
                key={faq.question}
                type="button"
                className={suggestionButtonClasses}
                onClick={() => setSearch(faq.question)}
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQBlock;
