export default function ProductCard() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-100">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-64">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9yYW5nZSUyMGZydWl0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Orange"
              className="w-full h-1/2 object-cover"
            />
            <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              20% OFF
            </span>
          </div>
          <div className="p-4 text-center">
            <h2 className="text-lg font-bold">Unlock Creativity</h2>
            <p className="text-gray-500 text-sm mt-1">
              Ut di aute non mollit, consequat consequat cillum.
            </p>
            <button className="mt-3 bg-[#4D55CC] text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-purple-600">
              View more
            </button>
          </div>
        </div>
      </div>
    );
  }
  