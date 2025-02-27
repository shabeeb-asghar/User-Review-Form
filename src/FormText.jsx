function FormText() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header accent line and label */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
        <span className="text-indigo-600 font-semibold text-xs sm:text-sm tracking-wider">
          SUBMIT YOUR FEEDBACK
        </span>
      </div>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
        How was your experience with us?
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
