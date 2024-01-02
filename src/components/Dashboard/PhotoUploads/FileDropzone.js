// components/FileDropzone.js
import { Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({ onFileChange, uploading }) => {
  const [filename, setFilename] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFilename(file.name);
        onFileChange(file);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-2 flex flex-row justify-center items-center border-dashed rounded-md cursor-pointer dark:text-photeradark-900 dark:bg-photeradark-200 hover:dark:bg-photeradark-300 hover:border-dark:bg-photeradark-300 w-full">
      {uploading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {filename ? (
            <>
              <input {...getInputProps()} disabled={uploading} />
              <p className="text-center">{filename}</p>
            </>
          ) : (
            <>
              <input {...getInputProps()} disabled={uploading} />
              <p className="text-center">
                Drag and drop or click to select a file
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FileDropzone;
