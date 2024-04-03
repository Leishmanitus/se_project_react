import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = () => {
  
  return (
    <main className="profile">
      <section className="profile__sidebar sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes clothes">
        <ClothesSection />
      </section>
    </main>
  );
};

export default Profile;
