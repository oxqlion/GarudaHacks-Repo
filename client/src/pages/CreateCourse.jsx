import React, { useEffect, useState } from "react";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherBackground, setTeacherBackground] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let thumbnailURL = null;

      if (thumbnail) {
        const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
        await uploadBytes(storageRef, thumbnail);
        thumbnailURL = await getDownloadURL(storageRef);
      }

      const courseData = {
        courseName,
        teacherName,
        teacherBackground,
        courseDescription,
        courseDate,
        courseTime,
        courseDuration,
        thumbnail: thumbnailURL,
        createdBy: user.email, // Save the user email
      };

      await addDoc(collection(db, "courses"), courseData);

      setCourseName("");
      setTeacherName("");
      setTeacherBackground("");
      setCourseDescription("");
      setCourseDate("");
      setCourseTime("");
      setCourseDuration("");
      setThumbnail(null);
      setLoading(false);
      alert("Course created successfully!");

      navigate("/dashboard-teacher"); // Corrected route
    } catch (e) {
      setLoading(false);
      setError("Error adding document: " + e.message);
    }
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black rounded-lg p-8 max-w-lg w-full"
      >
        <h1 className="font-bold text-2xl mb-4 text-center font-inter">
          Create Course
        </h1>
        <div className="mb-4">
          <label
            htmlFor="courseName"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Course Name:
          </label>
          <input
            id="courseName"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="teacherName"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Teacher Name:
          </label>
          <input
            id="teacherName"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="teacherBackground"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Teacher Background:
          </label>
          <input
            id="teacherBackground"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="text"
            value={teacherBackground}
            onChange={(e) => setTeacherBackground(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="courseDescription"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Course Description:
          </label>
          <textarea
            id="courseDescription"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="courseDate"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Course Date:
          </label>
          <input
            id="courseDate"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="date"
            value={courseDate}
            onChange={(e) => setCourseDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="courseTime"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Course Time:
          </label>
          <input
            id="courseTime"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="time"
            value={courseTime}
            onChange={(e) => setCourseTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="courseDuration"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Course Duration (in hours):
          </label>
          <input
            id="courseDuration"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="number"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-md text-left font-inter mb-2"
          >
            Thumbnail:
          </label>
          <input
            id="thumbnail"
            className="w-full font-regular rounded-xl border border-black bg-text-box-bg text-lg py-3 px-4 focus:outline-none focus:border-blue-500"
            type="file"
            onChange={handleThumbnailChange}
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full py-2 border bg-button-color text-white text-xl font-semibold"
          disabled={loading}
        >
          Create Course
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCourse;
