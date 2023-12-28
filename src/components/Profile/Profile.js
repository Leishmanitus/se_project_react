import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = ({ clothingItems }) => {
  return (
    <main className="profile">
      <section className="profile__sidebar sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes clothes">
        <ClothesSection clothingItems={clothingItems} />
      </section>
    </main>
  );
};

export default Profile;
