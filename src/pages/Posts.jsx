import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function Posts() {
  const [formData, setFormData] = useState({
    description: "",
    rating: 0,
    title: "",
  });

  const [postType, setPostType] = useState();
  const [tags, setTags] = useState([
    { key: "programming", text: "Programming", value: "programming" },
    { key: "math", text: "Math", value: "math" },
    { key: "science", text: "Science", value: "science" },
  ]);

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true); // Used to prevent memory leak

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Store image in Firebase Storage
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Upload is in progress");
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const addPost = async (imageURL = "") => {
      try {
        const newPost = {
          ...formData,
          image: imageURL,
          postType,
          userRef: auth.currentUser.uid,
          date: new Date().toISOString(),
        };

        if (postType === "article") {
          await addDoc(collection(db, "posts"), newPost);
        } else if (postType === "question") {
          await addDoc(collection(db, "questions"), newPost);
        }

        toast.success("Post added successfully");
        navigate("/home");
      } catch (error) {
        console.error(error);
        toast.error("Could not add the post");
      }
    };

    try {
      if (postType === "article") {
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput?.files[0];
        if (!file) {
          toast.error("Please upload an image.");
          return;
        }
        const imageURL = await storeImage(file);
        await addPost(imageURL);
      } else if (postType === "question") {
        await addPost();
      }
    } catch (error) {
      console.error("Error while submitting the post: ", error);
    }
  };

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid }); // Set the user to our state
        } else {
          navigate("/"); // Redirect to the login page if the user is not authenticated
        }
      });
    }

    return () => {
      isMounted.current = false;
    }; // Cleanup function to prevent memory leak
  }, [isMounted]);

  return (
    <div className="flex flex-col p-6 items-center ">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">New Post</h1>
      </header>

      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={onSubmit}>
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Select Post Type:
          </label>

          <div className="flex flex-row space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="postType"
                value="article"
                checked={postType === "article"}
                onChange={() => setPostType("article")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <label htmlFor="article" className="ml-2 text-gray-700">
                Article
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="postType"
                value="question"
                checked={postType === "question"}
                onChange={() => setPostType("question")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <label htmlFor="question" className="ml-2 text-gray-700">
                Question
              </label>
            </div>
          </div>

          {postType === "article" && (
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800">
                Article Post
              </h2>
              <h3 className="mt-2">What do you want to ask or share</h3>

              <div>
                {/* Title */}
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter a descriptive title"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Image */}
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Add an image
                </label>
                <input
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, .png"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-white focus:outline-none "
                />

                {/* Description */}
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter a brief description"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Rating */}
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  min={0}
                  max={5}
                  placeholder="Enter a rating"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 mt-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Post
                </button>
              </div>
            </div>
          )}

          {postType === "question" && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800">
                Question Post
              </h2>

              {/* Title */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter a question title"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

              {/* Description */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter a detailed description"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

              {/* Tag Selection */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Select a Tag
              </label>
              <select
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a tag</option>
                {tags.map((tag) => (
                  <option key={tag.value} value={tag.value}>
                    {tag.text}
                  </option>
                ))}
              </select>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2 px-4 mt-8 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Post
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default Posts;
