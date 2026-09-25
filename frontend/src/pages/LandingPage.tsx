import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RoleSection } from "@/components/sections/RoleSection";
import { AISection } from "@/components/sections/AISection";
import { DeveloperSection } from "@/components/sections/DeveloperSection";

export function LandingPage() {
  const location = useLocation();

  // Arriving here from another route (e.g. Navbar links clicked from
  // /choose-role) lands with a #section hash attached. Scroll to that
  // section once this page's content has mounted; otherwise start at top.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <RoleSection />
      <AISection />
      <DeveloperSection />
    </>
  );
}