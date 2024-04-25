import React, { useState, useEffect } from "react";
import Notes, { getGroupInitials } from "../Notes/Notes";
import Group from "../GroupCreation/Group";
import style from "./HomePage.module.css";
import bgImage from "../../assets/bg-image.png";
import { IoMdLock } from "react-icons/io";

const HomePage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const getGroupInitials = () => {};

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className={style.main}>
      {isSmallScreen ? (
        <div className={style.fullscreen}>
          {selectedGroup ? (
            <Notes
              group={selectedGroup}
              getGroupInitials={getGroupInitials}
              setSelectedGroup={setSelectedGroup}
            />
          ) : (
            <Group
              setSelectedGroup={handleGroupSelect}
              isSmallScreen={isSmallScreen}
            />
          )}
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.left}>
            <Group setSelectedGroup={setSelectedGroup} />
          </div>
          <div className={style.right}>
            {selectedGroup ? (
              <Notes
                group={selectedGroup}
                getGroupInitials={getGroupInitials}
                setSelectedGroup={setSelectedGroup}
              />
            ) : (
              <>
                <div className={style.content}>
                  <img
                    src={bgImage}
                    alt="Background Pic"
                    style={{
                      width: "600px",
                      height: "300px",
                      marginTop: "50px",
                    }}
                  />
                  <div className={style.heading}>Pocket Notes</div>
                  <p>
                    Send and receive messages without keeping your phone online.
                    <br></br> Use Pocket Notes on up to 4 linked devices and 1
                    mobile phone
                  </p>
                </div>
                <p>
                  <IoMdLock />
                  end-to-end encrypted
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
