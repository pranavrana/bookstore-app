const express = require("express");
const Book = require("./book.model");
const { postABook, getAllBooks, deleteBook, updateBook, getSingleBook } = require("./book.controller");
const router = express.Router();

router.post("/create/book", postABook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", updateBook);
router.delete("/delete/:id", deleteBook);
module.exports = router;
