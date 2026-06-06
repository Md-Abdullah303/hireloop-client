import Banner from "@/components/HomePage/Banner";
import NextroleSection from "@/components/HomePage/NextroleSection";
import SomeThingYouNeeded from "@/components/HomePage/SomeThingYouNeeded";
import SubscriptionPlanSection from "@/components/HomePage/SubscriptionPlanSection";
import TopPostedJobs from "@/components/HomePage/TopPostedJobs";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      <div className="">
        <Banner />
        <TopPostedJobs />
        <SomeThingYouNeeded />
        <SubscriptionPlanSection />
        <NextroleSection />
      </div>
    </div>
  );
}
