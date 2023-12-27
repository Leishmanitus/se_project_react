import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = (onCardClick, onCardDelete, onAddItem) => {
  return (
    <main className="profile">
      <section className="profile__sidebar sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes clothes">
        <ClothesSection
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onAddItem={onAddItem}
        />
      </section>
    </main>
  );
};

export default Profile;
