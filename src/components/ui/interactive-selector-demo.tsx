import InteractiveSelector from "@/components/ui/interactive-selector";

const InteractiveSelectorDemo = () => {
  return (
    <div className="min-h-screen bg-[#f4efe7] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <InteractiveSelector
          title="Our Food"
          description="Explore the range of event-ready menus, live counters, and signature presentation styles."
        />
      </div>
    </div>
  );
};

export { InteractiveSelectorDemo };

export default InteractiveSelectorDemo;
