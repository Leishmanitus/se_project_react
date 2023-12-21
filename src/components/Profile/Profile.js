import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = (cards, onCardClick, onCardDelete, onAddItem) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          secitonData={cards}
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onAddItem={() => onAddItem("garment")}
        />
      </section>
    </div>
  );
};

export default Profile;
