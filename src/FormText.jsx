function FormText () {

    return(
      
      <div className="flex flex-col mt-[14%] ml-[12.5%] gap-3 w-[35%]">
        {/* Line */}
        <div className="flex items-center gap-1">
        <div className="h-[2px] w-4 bg-[#4A3AFF]"></div>
        {/* Text */}
        <span className="text-[#4A3AFF] font-semibold text-md">
          SUBMIT YOUR FEEDBACK
        </span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 w-[90%] text-[#170F49]">
          Fill the form to submit your feedback
        </h1>
        {/* Subtitle */}
        <p className="mt-2 text-[#615F7A] text-md leading-relaxed w-[85%]">
        We value your feedback! Please take a moment to fill out this form and share your experience with EasyConcrete. Your input helps us improve and provide better services.
        </p>
      </div>
    )
}
export default FormText;