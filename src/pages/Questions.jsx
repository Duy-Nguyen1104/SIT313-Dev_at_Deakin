import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { marked } from "marked";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState({ tag: "", title: "", date: "" });
  const [tags, setTags] = useState([
    { key: "programming", text: "Programming", value: "programming" },
    { key: "math", text: "Math", value: "math" },
    { key: "science", text: "Science", value: "science" },
  ]);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollection = collection(db, "questions");
        const q = query(questionsCollection, orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let fetchedQuestions = [];
          querySnapshot.forEach((doc) => {
            fetchedQuestions.push({
              id: doc.id,
              data: doc.data(),
            });
          });

          setQuestions(fetchedQuestions);
          setFilteredQuestions(fetchedQuestions); // Initialize filtered questions
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
      } catch (error) {
        toast.error("Could not fetch questions");
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((question) => question.id !== id));
      setFilteredQuestions(
        filteredQuestions.filter((question) => question.id !== id)
      );
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Could not delete the question");
    }
  };

  const handleFilter = () => {
    let filtered = questions;

    if (filter.title) {
      filtered = filtered.filter((question) =>
        question.data.title.toLowerCase().includes(filter.title.toLowerCase())
      );
    }

    if (filter.tag) {
      filtered = filtered.filter(
        (question) => question.data.tag === filter.tag
      );
    }

    if (filter.date) {
      filtered = filtered.filter(
        (question) => question.data.date === filter.date
      );
    }

    setFilteredQuestions(filtered);
  };

  const toggleExpand = (id) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id); // set the id to null if already expanded
  };

  return (
    <div className="questions-section p-6">
      <h2 className="text-2xl font-bold mb-6">Questions</h2>

      {/* Filter Section */}
      <div className="filters mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by title"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
          className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
          className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Filter by tag</option>
          {tags.map((tag) => (
            <option key={tag.value} value={tag.value}>
              {tag.text}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((question, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">
              {question.data.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {expandedQuestionId === question.id ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(question.data.description),
                  }}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(
                      question.data.description.substring(0, 10) + "..."
                    ),
                  }}
                />
              )}
            </p>
            <div className="text-sm text-gray-500 mb-4">
              #{question.data.tag}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {new Date(question.data.date).toLocaleDateString()}
            </div>
            <div className="flex justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the parent click event from firing
                  toggleExpand(question.id);
                }}
                className="text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 py-2 px-4"
              >
                {expandedQuestionId === question.id
                  ? "Hide Details"
                  : "View Question"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(question.id);
                }}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
