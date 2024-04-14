import Product from "../../models/Products";
import connectDB from "../../middleware/mongoose";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/productImage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
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
        console.log("in the try block");
        const product = new Product(productData);
        const savedProduct = await product.save();
        console.log("Product saved successfully", savedProduct);
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
