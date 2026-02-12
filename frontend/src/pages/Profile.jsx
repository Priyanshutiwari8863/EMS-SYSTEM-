import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    api.get("/profile").then(res => {
      setProfile(res.data || {});
    });
  }, []);

  const uploadPhoto = async () => {
    const form = new FormData();
    form.append("photo", photo);

    const res = await api.put("/profile/photo", form);
    setProfile(res.data);
  };

  return (
    <div>
      <h2>My Profile</h2>

      <img
        src={
          profile.profilePic
            ? `http://localhost:5000${profile.profilePic}`
            : "https://via.placeholder.com/120"
        }
        width="120"
        style={{ borderRadius: "50%" }}
      />

      <br />

      <input
        type="file"
        onChange={e => setPhoto(e.target.files[0])}
      />

      <button onClick={uploadPhoto}>
        Upload Photo
      </button>

      <hr />

      <input
        value={profile.name || ""}
        onChange={e =>
          setProfile({ ...profile, name: e.target.value })
        }
      />

      <button
        onClick={async () => {
          await api.put("/profile", profile);
          alert("Profile updated");
        }}
      >
        Save
      </button>
    </div>
  );
}
