"use client";

export default function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="gradient-orb gradient-orb--primary absolute -top-[200px] -left-[200px] h-[500px] w-[500px]" />
      <div className="gradient-orb gradient-orb--secondary absolute -bottom-[150px] -right-[150px] h-[400px] w-[400px]" />
      <div className="gradient-orb gradient-orb--primary absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
    </div>
  );
}
