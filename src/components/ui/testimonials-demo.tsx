import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonails";

const testimonials = [
  {
    name: "Antony Raj",
    username: "@antony",
    body: "The food was absolutely delicious and the presentation was stunning.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    country: "India",
  },
  {
    name: "Anjali Sharma",
    username: "@anjali",
    body: "The setup was beautiful and our guests loved every item served.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    country: "India",
  },
  {
    name: "Rajesh Kumar",
    username: "@rajesh",
    body: "Professional team, on-time service, and excellent quality throughout.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    country: "India",
  },
  {
    name: "Lakshmi Narayanan",
    username: "@lakshmi",
    body: "Highly recommend for family functions. Smooth coordination from start to finish.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    country: "India",
  },
  {
    name: "Vikram Sundaram",
    username: "@vikram",
    body: "Veg and non-veg options were equally amazing. Will book again.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    country: "India",
  },
  {
    name: "Suresh Babu",
    username: "@suresh",
    body: "Biryani and starters were crowd favorites at our engagement event.",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80",
    country: "India",
  },
];

function TestimonialCard({
  img,
  name,
  username,
  body,
  country,
}: (typeof testimonials)[number]) {
  return (
    <Card className="w-[240px] border-[hsl(40,20%,85%)] bg-white/95 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="flex items-center gap-1 text-sm font-medium text-[hsl(30,20%,15%)]">
              {name} <span className="text-xs text-[hsl(30,10%,45%)]">({country})</span>
            </figcaption>
            <p className="text-xs font-medium text-[hsl(30,10%,45%)]">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-[hsl(30,10%,35%)]">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsDemo() {
  return (
    <div className="relative flex h-[520px] w-full flex-row items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,94%)] [perspective:300px] md:h-[620px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-60px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-12deg) rotateZ(14deg)",
        }}
      >
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {testimonials.map((review) => (
            <TestimonialCard key={`${review.username}-left`} {...review} />
          ))}
        </Marquee>

        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:38s]">
          {testimonials.map((review) => (
            <TestimonialCard key={`${review.username}-middle`} {...review} />
          ))}
        </Marquee>

        <div className="hidden md:block">
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:42s]">
            {testimonials.map((review) => (
              <TestimonialCard key={`${review.username}-right`} {...review} />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[hsl(45,40%,94%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[hsl(45,40%,94%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[hsl(45,40%,94%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[hsl(45,40%,94%)]" />
    </div>
  );
}
