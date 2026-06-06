import Banner from "@/components/HomePage/Banner";
import SomeThingYouNeeded from "@/components/HomePage/SomeThingYouNeeded";
import TopPostedJobs from "@/components/HomePage/TopPostedJobs";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      <div className="">
        <Banner />
        <TopPostedJobs />
        <SomeThingYouNeeded />
      </div>
    </div>
  );
}
