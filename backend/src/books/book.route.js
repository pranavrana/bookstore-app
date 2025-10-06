const express = require("express");
const { postABook, getAllBooks, deleteBook, updateBook, getSingleBook } = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/create-book", verifyAdminToken, upload.single('coverImage'),postABook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", verifyAdminToken, upload.single('coverImage'), updateBook);
router.delete("/delete/:id", verifyAdminToken, deleteBook);
module.exports = router;
