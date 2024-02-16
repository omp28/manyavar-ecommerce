export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ body: req.body });
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
