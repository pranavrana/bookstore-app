const Book = require("./book.model");
const path = require("path");
const fs = require("fs");
const postABook = async (req, res) => {
  try {
    const { title, description, category, trending, oldPrice, newPrice } =
      req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;
    const newBook = await Book({
      title,
      description,
      category,
      trending,
      oldPrice,
      newPrice,
      coverImage,
    });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create a book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch all the books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching the book", error);
    res.status(500).send({ message: "Failed to fetch the book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedCoverImage;
    if (req.file) {
      const book = await Book.findById(id);
      if (!book) {
        res.status(404).send({ message: "Book not found" });
      }
      fs.unlink(path.join(__dirname, "../../") + book.coverImage, (err) => {
        if (err) console.error("Old file delete error:", err);
        else console.log("Old file deleted:", book.coverImage);
      });
      updatedCoverImage = `/uploads/${req.file.filename}`;
    } else {
      updatedCoverImage = req.coverImage;
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...req.body, coverImage: updatedCoverImage },
      {
        new: true,
      }
    );
    if (!updatedBook) {
      res.status(404).send({ message: "Book not found" });
    }
    res
      .status(200)
      .send({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating the book", error);
    res.status(500).send({ message: "Failed to update the book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully", book });
  } catch (error) {
    console.error("Error updating the book", error);
    res.status(500).send({ message: "Failed to update the book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
