import { CardSkeleton } from "@/components/NextUI/CardSkeleton";
import { Box, useToast } from "@chakra-ui/react";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeedCardUser = ({ username }) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const toast = useToast();
  const [currentUserID, setUser] = useState(session?.user._id);
  const [userImage, setUserImage] = useState("");
  const [feed, setFeed] = useState([]);
  const [imageModal, setImageModal] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageId, setImageId] = useState("");
  const [photoFav, setPhotoFav] = useState([]);
  const [actList, setActList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const GetdataUser = async () => {
      try {
        const res = await axios(`/api/user/profile/${username}`);
        setUserImage(res.data.user.image);
        setFeed(res.data.userPublic);
      } catch (error) {
        return error;
      }
    };
    GetdataUser();
  }, [username]);

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

  const getImageInfo = (e) => {
    const data = e.target.value;
    const splitdata = data.split(",");
    const [url, title, imageIdData] = splitdata;
    setImageModal(url);
    setImageTitle(title);
    setImageId(imageIdData);
  };

  const saveToFav = async () => {
    const saved = await axios.put("/api/user/uploads/favpublic", {
      _id: currentUserID,
      imageId: imageId,
    });
    if (saved) {
      setActList(!actList);
    }
  };
  const deleteToFav = async () => {
    const deleteData = await axios.delete(
      `/api/user/uploads/favpublibyid/${currentUserID}/${imageId}`
    );
    if (deleteData) {
      setActList(!actList);
    }
  };

  if (!username) return <div className="text-5xl">No user</div>;

  return (
    <div className="grid w-full overflow-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5 gap-4 p-4">
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {feed.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg relative">
              <div className="relative w-full sm:h-[10.3rem] h-56 overflow-hidden">
                {/* Utilizamos el componente Image de Next.js para optimización */}
                <Image
                  src={item.url}
                  layout="fill"
                  objectFit="cover"
                  alt={item.title}
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
              {/*  */}
              <Button
                onPress={onOpen}
                className="z-10 ml-2 my-2"
                key={item._id}
                size="sm"
                value={[item.url, item.title, item._id]}
                onTouchEnd={(e) => {
                  getImageInfo(e);
                }}
                onClick={(e) => {
                  getImageInfo(e);
                }}>
                View
              </Button>

              {/*  */}

              <div className="absolute w-full sm:top-[10.3rem] sm:left-16  xl:left-24 top-56 left-32 bg-transparent p-1 flex flex-col justify-center items-center">
                <div className="w-14 h-14 relative overflow-hidden">
                  <Avatar
                    src={userImage}
                    layout="fill"
                    objectFit="contain"
                    size="md"
                    className="rounded-full shadow-sm shadow-photeradark-400"
                    alt="User profile"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          ))}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="xl"
            placement="center">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="text-2xl sm:text-xl font-light dark:text-gray-200">
                      {imageTitle}
                    </h2>
                  </ModalHeader>
                  <ModalBody>
                    <div className="relative w-full h-96 overflow-hidden">
                      <Image
                        src={imageModal}
                        layout="fill"
                        objectFit="contain"
                        alt={imageTitle}
                        className=""
                      />
                    </div>

                    <div className="w-full flex flex-row justify-between items-center">
                      <p>
                        <div className=" w-full bg-transparent p-1 flex flex-row justify-start gap-3 items-center">
                          <div className="w-14 h-14 sm:w-10 sm:h-10 relative overflow-hidden">
                            <Link
                              href={`/profile/${username}`}
                              className="text-sm font-medium dark:text-photeradark-900">
                              <Image
                                src={userImage}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-full shadow-sm shadow-photeradark-400"
                                alt="User profile"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </Link>
                          </div>
                          <Link
                            href={`/profile/${username}`}
                            className="text-sm font-medium dark:text-photeradark-300">
                            {username}
                          </Link>
                        </div>
                      </p>
                      {photoFav?.includes(imageId) ? (
                        <Tooltip content="Remove from favorites">
                          <Button
                            color="foreground"
                            size="sm"
                            className="w-1/12 bg-photeradark-500"
                            onPress={(e) => deleteToFav(e)}
                            value={imageId}
                            onClick={() =>
                              toast({
                                title: "Removed from favorites.",
                                status: "success",
                                duration: 1000,
                                isClosable: true,
                                TimeRanges: 1000,
                                position: "top-right",
                                render: () => (
                                  <Box className="bg-photeradark-700 p-3 sm:p-1 sm:py-3 rounded-xl flex flex-row justify-center gap-3 sm:mt-0 mt-20 items-center">
                                    <div className="w-12 h-12 sm:w-6 sm:h-6 border border-photeradark-300 rounded-full text-lg flex justify-center items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m4.5 12.75 6 6 9-13.5"
                                        />
                                      </svg>
                                    </div>
                                    <p className="text-lg sm:text-base">
                                      Removed from favorites.
                                    </p>
                                  </Box>
                                ),
                              })
                            }>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-8 h-8">
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Add to favorites">
                          <Button
                            color="foreground"
                            size="sm"
                            className="w-1/12 bg-photeradark-500"
                            onPress={(e) => saveToFav(e)}
                            onClick={() =>
                              toast({
                                title: "Add to favorites.",
                                status: "success",
                                duration: 1000,
                                isClosable: true,
                                position: "top-right",
                                render: () => (
                                  <Box className="bg-photeradark-700 p-3 sm:p-1 sm:py-3 rounded-xl flex flex-row justify-center gap-3 sm:mt-0 mt-20 items-center">
                                    <div className="w-12 h-12 sm:w-6 sm:h-6 border border-photeradark-300 rounded-full text-lg flex justify-center items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m4.5 12.75 6 6 9-13.5"
                                        />
                                      </svg>
                                    </div>
                                    <p className="text-lg sm:text-base">
                                      Add to favorites.
                                    </p>
                                  </Box>
                                ),
                              })
                            }
                            value={imageId}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                              />
                            </svg>
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default FeedCardUser;
