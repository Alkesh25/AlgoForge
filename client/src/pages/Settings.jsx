import { useState, useEffect } from "react";

function Settings() {

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setPreview(savedAvatar);
    }
  }, []);

  function handleUpload(e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem("avatar", reader.result);
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <div
        style={{
          background: "#1e293b",
          color: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "center"
        }}
      >

        <h1 style={{ marginBottom: "30px" }}>
          Profile Settings
        </h1>

        {/* Avatar */}

        <div style={{ marginBottom: "20px" }}>

          {preview ? (
            <img
              src={preview}
              alt="avatar"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #3b82f6"
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                margin: "auto"
              }}
            >
              👤
            </div>
          )}

        </div>

        {/* Upload */}

        <input
          type="file"
          onChange={handleUpload}
          style={{
            marginTop: "15px"
          }}
        />

      </div>

    </div>
  );
}

export default Settings;