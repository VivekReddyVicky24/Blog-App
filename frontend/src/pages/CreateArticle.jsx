import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("image", form.image);

    try {
      await API.post("/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Article created!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating article");
    }
  };

  return (
    <div className="container">
      <h2>Create Article</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="input"
          placeholder="Content"
          rows="5"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <input
          type="file"
          className="input"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <button className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
};

export default CreateArticle;