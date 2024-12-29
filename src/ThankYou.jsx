import ThankYouImage from "./assets/Thankyou.png"; // Adjust the path based on your project structure
const ThankYou = () =>{
    return(
        <div className="flex mt-[7%] flex-col items-center pt-20 pb-36 bg-white shadow-2xl border w-[37%] h-100 text-center">

<img
          src={ThankYouImage}
          alt="Thank you"
          className="mx-auto mb-4 w-32 h-32"
        />
        <h1 className="text-xl font-semibold text-gray-800 w-[70%]">
          Thank you! Your submission has been received!
        </h1>
        <p className="text-gray-600 mt-2 w-[80%]">
        Thank you for taking the time to share your feedback! We greatly value your thoughts and strive to make every experience exceptional. Your input helps us improve and serve you better.
        </p>
            </div>

    )
}
export default ThankYou