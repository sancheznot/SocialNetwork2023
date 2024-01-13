import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { useSession } from "next-auth/react";

const CategoriesById = ({ id }) => {
  const { data: session } = useSession();

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
    if (!id) return;
    const getUser = async () => {
      const res = await axios.get("/api/user/userslist");
      console.log(res, "user");
      setUsers(res.data);
    };
    const getPhotosByCategory = async () => {
      const res = await axios.get(`/api/user/public_bycategory/${id}`);
      setFeed(res.data.publicationByCategory);
    };
    getUser();
    getPhotosByCategory();
  }, [id]);

  useEffect(() => {
    if (feed.length > 0) {
      setIsLoading(false);
    }
  }, [feed]);

  return (
    <div className="w-full col-span-12 dark:bg-gradient-to-tl flex flex-col gap-2 dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg h-full text-3xl">
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
  );
};

export default CategoriesById;
