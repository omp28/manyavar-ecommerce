export default function handler(req, res) {
  let pincode = {
    603203: ["Chennai", "Tamil Nadu"],
    390006: ["Vadodara", "Gujarat"],
    560001: ["Bangalore", "Karnataka"],
  };
  res.status(200).json(pincode);
}
