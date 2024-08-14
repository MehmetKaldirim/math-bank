import { useState, useEffect } from "react";
import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";
import Button from "./Button";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Testimonials = () => {
  const [share, setShare] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    avatar: null,
    comment: "",
  });
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [limit, setLimit] = useState(3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]); // Add new comment to the beginning of the list
        setFormData({
          username: "",
          title: "",
          avatar: null,
          comment: "",
        });
        setShare(false);
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comment/getAll?limit=${limit}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data);
        if (data.length < limit) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 3);
  };

  useEffect(() => {
    fetchComments();
  }, [limit]);

  return (
    <section
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />
      {!share ? (
        <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
          <h2 className={styles.heading2}>
            What People are <br className="sm:block hidden" /> saying about us
          </h2>

          <div className="w-full md:mt-0 mt-6">
            <p className={`${styles.paragraph} text-left max-w-[450px]`}>
              Your thought is important for us. Please share your thoughts with
              us.
            </p>
            <Button
              styles={`mt-10`}
              onClick={() => {
                setShare((prev) => !prev);
              }}
            >
              Share
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full md:mt-0 mt-6">
          <h2 className={styles.heading2}>
            What are your <br className="sm:block hidden" /> thoughts about us
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="p-3 rounded-md border border-gray-300"
              required
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Your Title"
              className="p-3 rounded-md border border-gray-300"
              required
            />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="p-3 rounded-md border border-gray-300"
              required
            />
            <p className="text-sm self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Your Thoughts"
              className="p-3 rounded-md border border-gray-300 h-32"
              required
            />
            <Button type="submit" styles="mt-4">
              Submit
            </Button>
          </form>
        </div>
      )}

      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
        {comments.map((comment, index) => (
          <FeedbackCard
            key={comment._id || index}
            {...comment}
            name={comment.username}
            content={comment.comment}
            title={comment.title}
            img={comment.avatar}
          />
        ))}
      </div>

      {showMore && (
        <Button styles="mt-6" onClick={handleShowMore}>
          Show More
        </Button>
      )}
    </section>
  );
};

export default Testimonials;
