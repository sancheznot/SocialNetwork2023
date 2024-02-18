import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";

const ButtonOption = ({ photoId, currentUserID, setActList, actList }) => {
  const deletePhoto = async (e) => {
    const res = await axios.delete(`/api/user/profile/${currentUserID}`, {
      data: { photoId: photoId },
    });
    if (res.data.message === "photo deleted") setActList(!actList);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
          className="flex justify-end items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" >
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => deletePhoto(photoId)}>
          Delete Publication
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ButtonOption;
