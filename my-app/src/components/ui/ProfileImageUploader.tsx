// src/components/ProfileImageUploader.tsx
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { Button } from "@mui/material";
import React from "react";

type Props = {
  onUploadTempUrl: (url: string) => void;
};

const ProfileImageUploader = ({ onUploadTempUrl }: Props) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `profile-images/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    onUploadTempUrl(url); // ← DB更新しない、ただの一時保存
  };

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="profile-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="profile-upload">
        <Button variant="outlined" component="span">Upload Image</Button>
      </label>
    </>
  );
};

export default ProfileImageUploader;

