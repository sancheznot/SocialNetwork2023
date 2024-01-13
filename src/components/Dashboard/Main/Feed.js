import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { CardSkeleton } from "@/components/NextUI/CardSkeleton";
import FeedCard from "./FeedCard/FeedCard";

const Feed = ({ session }) => {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const res = await axios.get("/api/user/userslist");
      setUsers(res.data);
    };
    const getFeed = async () => {
      const res = await axios.get("/api/user/uploads/publication");
      setFeed(res.data.photos);
    };
    getUser();
    getFeed();
  }, []);

  useEffect(() => {
    if (feed.length > 0) {
      setIsLoading(false);
    }
  }, [feed]);

  

  return (
    <>
      <FeedCard isLoading={isLoading} feed={feed} users={users} photoFav={photoFav} currentUserID={currentUserID} setActList={setActList} actList={actList}/>
    </>
  )
};

export default Feed;
