import React from "react";

const BackgroundSection = () => {
  return (
    <div
      className="h-full rounded bg-cover bg-center hidden lg:block"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1570649236495-42fa5fe5c48b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    ></div>
  );
};

export default BackgroundSection;