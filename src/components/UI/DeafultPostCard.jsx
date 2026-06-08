import { CircleDollar } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";

export function DeafultPostCard({ job }) {
  //   console.log(job);

  // job অবজেক্ট থেকে ডাটা Destructure করে নেওয়া হলো
  const { role, description, location, salary, per, type } = job;

  return (
    <Card className=" p-4 bg-zinc-900 text-white border border-zinc-800">
      <div className="flex items-center gap-2 mb-3">
        <CircleDollar
          aria-label="Dollar sign icon"
          className="text-success size-6"
          role="img"
        />
        <span className="text-sm font-semibold text-zinc-400 capitalize">
          {type} ({location})
        </span>
      </div>

      <Card.Header className="flex-col items-start p-0">
        {/* এখানে ডাইনামিক Role বসানো হয়েছে */}
        <Card.Title className="text-xl font-bold">{role}</Card.Title>

        {/* এখানে ডাইনামিক Description বসানো হয়েছে */}
        <Card.Description className="text-zinc-400 mt-2 text-sm line-clamp-3">
          {description}
        </Card.Description>
      </Card.Header>

      <Card.Footer className="justify-between items-center mt-4 p-0">
        {/* এখানে ডাইনামিক Salary ও Per বসানো হয়েছে */}
        <div className="text-md font-medium text-emerald-400">
          ${salary.toLocaleString()} /{" "}
          <span className="text-xs text-zinc-500">{per}</span>
        </div>

        <Link
          aria-label={`Apply for ${role}`}
          href="#"
          className="text-primary text-sm"
        >
          Apply Now
        </Link>
      </Card.Footer>
    </Card>
  );
}
