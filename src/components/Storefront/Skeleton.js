import React from "react";

export default function Skeleton({ num }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
      {Array.from({ length: num }).map(() => (
        <div className="animate-pulse">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 animate-pulse"></div>
          <div class="mt-4 w-56 bg-gray-200 h-5 rounded-md "></div>
          <div class="mt-4 w-16 bg-gray-200 h-7 rounded-md "></div>
        </div>
      ))}
    </div>
  );
}
