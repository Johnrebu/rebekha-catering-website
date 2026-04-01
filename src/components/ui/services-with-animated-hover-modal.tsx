import { cn } from "@/lib/utils";
import gsap from "gsap";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CakeSlice,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const scaleAnimation = {
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
  },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
  initial: {
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
} as const;

export interface ServiceHoverItem {
  color: string;
  description: string;
  eyebrow: string;
  icon?: LucideIcon;
  image: string;
  summary: string;
  title: string;
}

export interface ServicesWithAnimatedHoverModalProps {
  className?: string;
  description?: string;
  items?: ServiceHoverItem[];
  kicker?: string;
  title?: string;
}

const defaultItems: ServiceHoverItem[] = [
  {
    color: "#7a3d2b",
    description:
      "Ceremony-ready buffets, live counters, and polished guest flow for large family celebrations.",
    eyebrow: "Signature Events",
    icon: HeartHandshake,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    summary: "Curated menus and graceful service pacing for memorable wedding moments.",
    title: "Wedding Catering",
  },
  {
    color: "#d5974f",
    description:
      "Playful menus, crowd-friendly bites, and cheerful table styling for all-age celebrations.",
    eyebrow: "Family Celebrations",
    icon: CakeSlice,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    summary: "Easy-to-serve spreads that keep birthday guests moving, mingling, and happy.",
    title: "Birthday Parties",
  },
  {
    color: "#445a66",
    description:
      "Efficient service, clean presentation, and dependable setup for launches, meetings, and team events.",
    eyebrow: "Business Catering",
    icon: BriefcaseBusiness,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    summary: "Professional meals tailored to office timelines and polished corporate presentation.",
    title: "Corporate Events",
  },
  {
    color: "#5a5248",
    description:
      "Warmer, more intimate dining with slower pacing and presentation designed for smaller gatherings.",
    eyebrow: "Private Dining",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    summary: "Thoughtful courses and elegant service for quieter dinners that still feel special.",
    title: "Private Dinners",
  },
];

type ModalState = {
  active: boolean;
  index: number;
};

function ServiceRow({
  index,
  isActive,
  item,
  onSelect,
  setModal,
}: {
  index: number;
  isActive: boolean;
  item: ServiceHoverItem;
  onSelect: (index: number) => void;
  setModal: (modal: ModalState) => void;
}) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between gap-4 border-t border-[hsl(40,20%,85%)] py-6 text-left transition-opacity duration-200 last:border-b md:gap-8 md:py-8"
      onBlur={() => setModal({ active: false, index })}
      onClick={() => onSelect(index)}
      onFocus={() => {
        onSelect(index);
        setModal({ active: true, index });
      }}
      onMouseEnter={() => {
        onSelect(index);
        setModal({ active: true, index });
      }}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <div className="flex min-w-0 items-center gap-4 md:gap-6">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[hsl(40,20%,80%)] bg-white text-[hsl(30,20%,15%)] transition-all duration-300",
            isActive && "border-[hsl(43,76%,58%)] bg-[hsl(43,76%,58%)]",
          )}
        >
          {Icon ? <Icon className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </span>

        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[hsl(30,10%,45%)]">
            {item.eyebrow}
          </p>
          <h3
            className={cn(
              "mt-2 text-3xl leading-none text-[hsl(30,20%,15%)] transition-transform duration-300 md:text-5xl",
              isActive && "translate-x-2.5",
            )}
          >
            {item.title}
          </h3>
        </div>
      </div>

      <div className="hidden max-w-sm md:block">
        <p className="text-right text-sm leading-7 text-[hsl(30,10%,35%)] transition-transform duration-300 group-hover:-translate-x-2">
          {item.summary}
        </p>
      </div>
    </button>
  );
}

function Modal({
  items,
  modal,
}: {
  items: ServiceHoverItem[];
  modal: ModalState;
}) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalNode = modalContainer.current;
    const cursorNode = cursor.current;
    const cursorLabelNode = cursorLabel.current;

    if (!modalNode || !cursorNode || !cursorLabelNode) {
      return undefined;
    }

    const xMoveContainer = gsap.quickTo(modalNode, "left", {
      duration: 0.75,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalNode, "top", {
      duration: 0.75,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursorNode, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursorNode, "top", {
      duration: 0.45,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabelNode, "left", {
      duration: 0.4,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabelNode, "top", {
      duration: 0.4,
      ease: "power3",
    });

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[320px] w-[420px] items-center justify-center overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-[0_30px_90px_-30px_rgba(15,10,7,0.45)] lg:flex"
        initial="initial"
        variants={scaleAnimation}
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transform: `translateY(-${index * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          {items.map((item) => (
            <div className="relative h-full w-full overflow-hidden" key={item.title}>
              <div className="absolute inset-0" style={{ backgroundColor: item.color }} />
              <img
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90"
                loading="lazy"
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/75">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-4xl leading-none">{item.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-6 text-white/85">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-20 w-20 items-center justify-center rounded-full bg-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] lg:flex"
        initial="initial"
        variants={scaleAnimation}
      />

      <motion.div
        ref={cursorLabel}
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed left-0 top-0 z-[62] hidden h-20 w-20 items-center justify-center rounded-full bg-transparent text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(30,20%,15%)] lg:flex"
        initial="initial"
        variants={scaleAnimation}
      >
        View
      </motion.div>
    </>
  );
}

function MobilePreviewCard({ item }: { item: ServiceHoverItem }) {
  const Icon = item.icon;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[hsl(40,20%,85%)] bg-white shadow-[0_20px_60px_-35px_rgba(15,10,7,0.35)] lg:hidden">
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: item.color }} />
        <img
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90"
          loading="lazy"
          src={item.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/75">
            {item.eyebrow}
          </p>
          <h3 className="mt-3 text-4xl leading-none">{item.title}</h3>
          <p className="mt-4 text-sm leading-6 text-white/85">{item.description}</p>
        </div>
      </div>

      <div className="flex items-start gap-4 p-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(45,40%,94%)] text-[hsl(30,20%,15%)]">
          {Icon ? <Icon className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </span>
        <div>
          <p className="text-sm leading-7 text-[hsl(30,10%,35%)]">{item.summary}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(43,76%,58%)]">
            Tap another service above to preview it
          </p>
        </div>
      </div>
    </div>
  );
}

export function ServicesWithAnimatedHoverModal({
  className,
  description = "Hover on desktop or tap on mobile to preview how each catering format feels before you request a quote.",
  items = defaultItems,
  kicker = "Interactive Service Preview",
  title = "See the setup before the first plate is served.",
}: ServicesWithAnimatedHoverModalProps) {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (items.length === 0) {
    return null;
  }

  const selectedItem = items[selectedIndex] ?? items[0];

  return (
    <section className={cn("relative overflow-hidden bg-white py-16 md:py-24", className)}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-[hsl(43,76%,58%)]">
                {kicker}
              </p>
              <h2 className="text-4xl leading-none text-[hsl(30,20%,15%)] md:text-6xl">{title}</h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[hsl(30,10%,35%)] md:text-base md:leading-8">
              {description}
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,94%)]/70 px-6 backdrop-blur-sm md:px-10">
              {items.map((item, index) => (
                <ServiceRow
                  index={index}
                  isActive={selectedIndex === index}
                  item={item}
                  key={item.title}
                  onSelect={setSelectedIndex}
                  setModal={setModal}
                />
              ))}
            </div>

            <Modal items={items} modal={modal} />
          </div>

          <div className="mt-8">
            <MobilePreviewCard item={selectedItem} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesWithAnimatedHoverModal;
