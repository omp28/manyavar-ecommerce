import Product from "../../models/Products";
import connectDB from "../../middleware/mongoose";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/productImage");
  },
  filename: function (req, file, cb) {
    // Generate a random number with 8 digits
    const randomNumber = Math.floor(Math.random() * 100000000);
    // Combine the random number with the original filename
    cb(null, randomNumber + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("img");

const handler = async (req, res) => {
  if (req.method === "POST") {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Image upload failed" });
      }

      const imagePath = req.file.path.slice(6);

      const productData = {
        title: req.body.title,
        slug: req.body.slug,
        desc: req.body.desc,
        category: req.body.category,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        availableQty: req.body.availableQty,
        img: imagePath,
      };

      try {
        const product = new Product(productData);
        const savedProduct = await product.save();
        res.status(200).json({ success: true, product: savedProduct });
      } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Error saving product" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default connectDB(handler);
