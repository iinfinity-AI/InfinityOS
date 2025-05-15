import SideBar from "../../components/userdashboard/SideBar";
import TopBar from "../../components/userdashboard/TopBar";
import GreetingSection from "../../components/userdashboard/GreetingSection";
import HelpfullCard from "../../components/userdashboard/HelpfullCard";
import RecentsCard from "../../components/userdashboard/RecentsCard";
import AssignedToMeCard from "../../components/userdashboard/AssignedToMeCard";
import AssignedCommentsCard from "../../components/userdashboard/AssignedCommentsCard";


const UserDashboardPage = () => {
  return (
    <div className="flex bg-[#D7E5FF] min-h-screen">
      <SideBar />

      <main className="flex-1 flex flex-col">
        <TopBar />
        <GreetingSection />

        <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          <HelpfullCard />
          <RecentsCard />
          <AssignedToMeCard />
          <AssignedCommentsCard />

         
        </section>
      </main>
    </div>
  );
};

export default UserDashboardPage;
