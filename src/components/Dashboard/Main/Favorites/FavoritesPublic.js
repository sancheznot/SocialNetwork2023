import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

const FavoritesPublic = ({ session }) => {
  const [currentUserID, setUser] = useState(session?.user._id);
  const [photoFav, setPhotoFav] = useState([]);
  const [actList, setActList] = useState(false);

  useEffect(() => {
    const getPhotoFav = async () => {
      const res = await axios.get(
        `/api/user/uploads/favpublibyid/${currentUserID}`
      );
      setPhotoFav(res.data);
    };
    if (session) {
      setUser(session?.user._id);
      getPhotoFav();
    }
    if (actList) {
      getPhotoFav();
    }
  }, [session, currentUserID, actList]);

  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const res = await axios.get("/api/user/userslist");
      setUsers(res.data);
    };
    if (photoFav.length > 0) {
      const getFeedFav = async () => {
        const res = await axios.get(
          `/api/user/uploads/publicationbyid/${photoFav}`
        );
        setFeed(res.data.FavoritePost);
      };
      getFeedFav();
    }
    getUser();
  }, [photoFav]);

  useEffect(() => {
    if (feed.length > 0) {
      setIsLoading(false);
    }
  }, [feed]);

  return (
    <>
      <div className="flex w-full flex-col ">
        <div className="h-[calc(100vh-11rem)] w-full overflow-auto scrollbar-hide">
          <FeedCard
            isLoading={isLoading}
            feed={feed}
            users={users}
            photoFav={photoFav}
            currentUserID={currentUserID}
            setActList={setActList}
            actList={actList}
          />
        </div>
      </div>
    </>
  );
};

export default FavoritesPublic;
