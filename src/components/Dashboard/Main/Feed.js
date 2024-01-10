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
} from "@nextui-org/react";
import { CardSkeleton } from "@/components/NextUI/CardSkeleton";


const Feed = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageModal, setImageModal] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageUser, setImageUser] = useState("");

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

  const getImageInfo = (e) => {
    const data = e.target.value;
    const splitdata = data.split(",");
    const [url, title, user] = splitdata
    setImageModal(url);
    setImageTitle(title);
    setImageUser(user);

  };

  return (
    <div className="grid w-full overflow-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5 gap-4 p-4">
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {feed.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg relative">
              <div className="relative w-full h-60 overflow-hidden">
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
                className="z-10 ml-2"
                key={item._id}
                size="sm"
                value={[item.url, item.title, item.user]}
                onClick={(e) => {
                  getImageInfo(e);
                }}>
                View
              </Button>

              {/*  */}
              {users.map(
                (user) =>
                  user._id === item.user && (
                    <div
                      key={user._id}
                      className="absolute w-full sm:top-52 top-48 bg-transparent p-1 flex flex-col justify-center items-center">
                      <div className="w-14 h-14 relative overflow-hidden">
                        <Image
                          src={user.image}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-full shadow-sm shadow-photeradark-400"
                          alt="User profile"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <h2 className="text-sm font-medium dark:text-photeradark-900">
                        {user.username}
                      </h2>
                    </div>
                  )
              )}
              {/* Información del usuario y título */}
              <div className="p-4 mt-5 sm:mt-6 xl:mt-3">
                <p className="text-gray-600 font-light text-lg text-justify">
                  {item.title}
                </p>
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
                    <h2 className="text-2xl font-light dark:text-gray-200">
                      {imageTitle}
                    </h2>
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      <div className="relative w-full h-96 overflow-hidden">
                        <Image
                          src={imageModal}
                          layout="fill"
                          objectFit="contain"
                          alt={imageTitle}
                          className=""
                        />
                      </div>
                    </p>
                    <p>
                      {users.map(
                        (user) =>
                          user._id === imageUser && (
                            <div
                              key={user._id}
                              className=" w-full bg-transparent p-1 flex flex-row justify-start gap-3 items-center">
                              <div className="w-14 h-14 relative overflow-hidden">
                                <Image
                                  src={user.image}
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-full shadow-sm shadow-photeradark-400"
                                  alt="User profile"
                                />
                              </div>
                              <h2 className="text-sm font-medium dark:text-photeradark-900">
                                {user.username}
                              </h2>
                            </div>
                          )
                      )}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Feed;
