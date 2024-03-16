import main from "../components/main.png";
import Image from "next/image";
import book_apoointment from "../components/book_appointment.png";

export default function Home() {
  return (
    <>
      <div>
        <Image priority={true} src={main} alt="hero" />
      </div>
      <div className="flex py-8">
        <div className="container mx-auto px-4 py-8 justify-center items-center flex flex-col">
          <div className="text-center pb-8">
            <h1 className="text-4xl font-bold">Get recommendations from a</h1>
            <p className="text-xl">personal stylist!</p>
          </div>
          <div className="text-center">
            <p className="text-base font-medium mb-4">
              Consult our expert stylist to curate a look for your D day
            </p>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-700 duration-500  text-white rounded-md  font-medium"
            >
              BOOK A VIDEO CALL
            </a>
          </div>
        </div>
        <div>
          <Image src={book_apoointment} alt="hero" />
        </div>
      </div>
    </>
  );
}
