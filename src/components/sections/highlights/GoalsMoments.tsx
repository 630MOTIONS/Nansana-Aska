import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { videos } from "@/lib/highlights";
import VideoCard from "./VideoCard";

export default function GoalsMoments() {
  const goals = videos.filter((v) => v.group === "goals");

  return (
    <section
      aria-label="Goals and big moments"
      className="bg-surface-tint py-16"
    >
      <div className="mx-auto w-full max-w-site px-4">
        <SectionHeading
          className="max-w-2xl"
          eyebrow="Electric finishes & game savers"
          eyebrowTone="gold"
          eyebrowIcon={<Star size={14} aria-hidden />}
          title="Goals & big moments"
          description="Revisit the goals, saves, and decisive moments that make every game memorable across the FAU Futsal Super League campaign."
        />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((video) => (
            <li key={video.id}>
              <VideoCard video={video} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
