function FormText() {
  return (
    <div className="flex flex-col gap-4 w-full mt-24">
      {/* Header accent line and label */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
        <span className="text-indigo-600 font-semibold text-lg tracking-wider">
          SUBMIT YOUR FEEDBACK
        </span>
      </div>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-6xl font-bold text-gray-800 leading-tight">
        Fill the form to submit your feedback
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
        We value your feedback! Please take a moment to share your experience
        with EasyConcrete. Your input helps us improve and provide better
        services.
      </p>
    </div>
  );
}
export default FormText;
