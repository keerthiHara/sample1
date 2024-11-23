

// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { Link } from "react-router-dom";
// import BookCard from "../components/BookCard";
// // import User from "../../../backend/models/User";

// const Home = ({ userRole }) => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newBookTitle, setNewBookTitle] = useState("");
//   const [newBookAuthor, setNewBookAuthor] = useState("");
//   const [newBookDescription, setNewBookDescription] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false); // State to toggle Add Book form visibility

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await Axios.get("http://localhost:5000/api/books");
//         setBooks(response.data);
//       } catch (err) {
//         setError("Error fetching books");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);
// console.log(userRole,"kinhuhygtf");
// const handleAddBook = async (e) => {
//   e.preventDefault();

//   const newBook = {
//     title: newBookTitle,
//     author: newBookAuthor,
//     description: newBookDescription,
//   };

//   try {
//     const response = await Axios.post("http://localhost:5000/api/books", newBook);
    
//     setBooks((prevBooks) => [...prevBooks, response.data]);
//     // Clear the form fields
//     setNewBookTitle("");
//     setNewBookAuthor("");
//     setNewBookDescription("");
//     setShowAddForm(false); // Hide the form after submission
//     alert("Book added successfully!");
//   } catch (err) {
//     console.error("Error adding book:", err);
//     setError("There was an error adding the book. Please try again.");
//   }
// };

// console.log(userdetail);

//   if (loading) return <p>Loading books...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Featured Books</h1>
      
//       {userRole && userRole === "admin" && (
//         <button>
//          <button onClick={() => setShowAddForm(true)}>Add Book</button>
//         </button>
//       )}
//       {
//         userRole && userRole ==="admin" && showAddForm &&(
//           <div>
//           <h2>Add a New Book</h2>
//           <form onSubmit={handleAddBook}>
//             <div>
//               <label>Title</label>
//               <input
//                 type="text"
//                 value={newBookTitle}
//                 onChange={(e) => setNewBookTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Author</label>
//               <input
//                 type="text"
//                 value={newBookAuthor}
//                 onChange={(e) => setNewBookAuthor(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Description</label>
//               <textarea
//                 value={newBookDescription}
//                 onChange={(e) => setNewBookDescription(e.target.value)}
//                 required
//               ></textarea>
//             </div>
//             <button type="submit">Add Book</button>
//           </form>
//         </div>
//         )
//       }
//       <div>
//         {books.map((book) => (
//           <BookCard key={book._id} book={book} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from "react";
import Axios from "axios";
import BookCard from "../components/BookCard";

const Home = ({ userRole ,email}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", description: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (err) {
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:5000/api/books", newBook);
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setNewBook({ title: "", author: "", description: "" });
      setShowAddForm(false);
      alert("Book added successfully!");
    } catch (err) {
      setError("Error adding book. Please try again.");
    }
  };
  
  

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Featured Books</h1>
      {userRole === "admin" && (
        <button onClick={() => setShowAddForm((prev) => !prev)}>
          {showAddForm ? "Cancel" : "Add Book"}
        </button>
      )}
      {showAddForm && userRole === "admin" && (
        <form onSubmit={handleAddBook}>
          <label>Title: </label>
          <input
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
          />
          <label>Author: </label>
          <input
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
          />
          <label>Description: </label>
          <textarea
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      )}
      <div>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
