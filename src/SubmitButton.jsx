const SubmitButton = ({ handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className="mt-6 py-4 w-[70%] sm:w-[50%] md:w-[40%] bg-[#4A3AFF] text-white rounded-full shadow-xl shadow-[#4A3AFF42] hover:bg-blue-600 text-sm font-semibold transition duration-300"
    >
      Submit feedback
    </button>
  );
};

export default SubmitButton;
