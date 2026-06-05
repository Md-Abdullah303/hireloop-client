import Banner from "@/components/HomePage/Banner";
import TopPostedJobs from "@/components/HomePage/TopPostedJobs";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" ">
      <div className="">
        <Banner />
        <TopPostedJobs />
      </div>
    </div>
  );
}
