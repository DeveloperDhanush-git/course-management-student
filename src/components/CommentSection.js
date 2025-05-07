import { useState, useRef } from "react";
import {
  FaThumbsUp,
  FaReply,
  FaPlus,
  FaImage,
  FaPaperclip,
  FaEye,
  FaPaperPlane,
  FaTimes,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa";

const initialComments = [
  {
    id: 1,
    name: "Anna",
    time: "12:03 PM",
    text: "Deserunt minim incididunt cillum nostrud do voluptate excepteur...",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 101,
        name: "Mike",
        time: "12:30 PM",
        text: "I agree with this point completely!",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        likes: 2,
        isLiked: false,
      }
    ]
  },
  {
    id: 2,
    name: "John",
    time: "08:10 AM",
    text: "Id ullamco qui tempor consectetur fugiat magna officia eiusmod...",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    images: [
      "https://images.unsplash.com/photo-1525869811964-53594bfcb4b0?w=500",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
    ],
    likes: 12,
    isLiked: true,
    replies: []
  },
  {
    id: 3,
    name: "Sarah",
    time: "Yesterday",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    likes: 3,
    isLiked: false,
    replies: []
  }
];

const tabs = [
  "Summary",
  "Discussion (50)",
  "Resources & Documents",
  "Transcript",
];

const CommentSection = () => {
  const [activeTab, setActiveTab] = useState("Discussion (50)");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [visibleComments, setVisibleComments] = useState(2);
  const [newComment, setNewComment] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyText("");
  };

  const handleReplySubmit = (commentId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      name: "Current User",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: replyText,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      likes: 0,
      isLiked: false,
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyText("");
  };

  const handleLikeClick = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: (comment.replies || []).map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      }));
    }
  };

  const handleShowMore = () => {
    setVisibleComments(comments.length);
  };

  const handleShowLess = () => {
    setVisibleComments(2); // Reset to initial number of visible comments
  };

  const handleNewCommentSubmit = () => {
    if (!newComment.trim() && previewImages.length === 0) return;

    const comment = {
      id: Date.now(),
      name: "Current User",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newComment,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      likes: 0,
      isLiked: false,
      images: previewImages,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setPreviewImages([]);
    setVisibleComments(prev => prev + 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    const newImages = [...previewImages];
    newImages.splice(index, 1);
    setPreviewImages(newImages);
  };

  const remainingComments = Math.max(0, comments.length - visibleComments);
  const allCommentsVisible = visibleComments >= comments.length;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return <p className="p-4 text-gray-700">Summary content here...</p>;
      case "Resources & Documents":
        return <p className="p-4 text-gray-700">Resources content here...</p>;
      case "Transcript":
        return <p className="p-4 text-gray-700">Transcript content here...</p>;
      default:
        return null;
    }
  };

  const renderComment = (comment, isReply = false, parentId = null) => (
    <div key={comment.id} className={`mb-6 ${isReply ? 'ml-8 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="flex gap-2 md:gap-3">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm md:text-base">
              {comment.name}
            </h3>
            <span className="text-xs md:text-sm text-gray-500">
              {comment.time}
            </span>
          </div>
          <p className="text-gray-700 mt-1 text-xs md:text-sm">
            {comment.text}
          </p>
          {comment.images && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {comment.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Comment Image"
                  className="w-24 h-16 md:w-36 md:h-24 rounded-lg object-cover"
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 mt-3 text-gray-600">
            <button
              className={`flex items-center gap-1 ${comment.isLiked ? 'text-[#4D55CC]' : 'text-gray-600'}`}
              onClick={() => handleLikeClick(comment.id, isReply, parentId)}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg ${comment.isLiked ? 'bg-[#4D55CC]' : 'bg-gray-200'}`}>
                <FaThumbsUp className={`text-sm md:text-lg ${comment.isLiked ? 'text-white' : 'text-gray-600'}`} />
              </div>
              {comment.likes > 0 && (
                <span className="text-xs md:text-sm">{comment.likes}</span>
              )}
            </button>
            {!isReply && (
              <button
                className="text-[#4D55CC] text-xs md:text-sm"
                onClick={() => handleReplyClick(comment.id)}
              >
                Reply
              </button>
            )}
          </div>

          {/* Reply Input Field */}
          {!isReply && replyingTo === comment.id && (
            <div className="mt-4 pl-2 md:pl-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="User"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 shadow-sm"
                />
                <div className="flex flex-1 items-center bg-gray-100 rounded-md px-2 py-2 border border-gray-400 focus-within:border-purple-500">
                  <input
                    type="text"
                    placeholder="Write your reply..."
                    className="ml-2 flex-grow bg-transparent px-2 text-gray-700 focus:outline-none text-xs md:text-sm"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit(comment.id)}
                  />
                  <button
                    className="text-[#4D55CC] text-xs md:text-sm font-medium px-2"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Tabs Section */}
      <div className="flex flex-col sm:flex-row justify-start px-4 sm:px-8 py-3 text-gray-700 bg-gray-100 gap-3 sm:gap-8 w-full rounded-lg shadow-sm">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={`cursor-pointer pb-2 whitespace-nowrap ${activeTab === tab
                ? "font-semibold text-gray-900 border-b-4 border-black"
                : ""
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Render the selected tab content */}
      {renderTabContent()}

      {/* Comment Input Box */}
      <div className="px-4 py-4 flex items-start gap-2">
        <img
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="User"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-sm mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center bg-gray-100 rounded-md px-2 py-2 border border-gray-400 focus-within:border-purple-500 w-full">
            <div className="flex space-x-2 text-[#4D55CC]">
              <button onClick={() => fileInputRef.current.click()}>
                <FaImage className="cursor-pointer text-sm md:text-base" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                className="hidden"
              />
            </div>
            <input
              type="text"
              placeholder="Leave a public comment"
              className="ml-2 flex-grow bg-transparent px-2 text-gray-700 focus:outline-none w-full"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Ensure state is updated correctly
            />

            <button onClick={handleNewCommentSubmit}>
              <FaPaperPlane className="cursor-pointer text-[#4D55CC]" />
            </button>
          </div>

          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {previewImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full p-1"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="p-4">
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id}>
            {renderComment(comment)}
            {/* Render replies */}
            {(comment.replies || []).map((reply) => (
              renderComment(reply, true, comment.id)
            ))}
          </div>
        ))}

        {/* Show More/Show Less Button */}
        <div className="text-center">
          {remainingComments > 0 && (
            <button
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-300 mx-auto"
              onClick={handleShowMore}
            >
              Show more discussion ({remainingComments})
              <FaChevronDown className="text-xs" />
            </button>
          )}
          {allCommentsVisible && comments.length > 2 && (
            <button
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-300 mx-auto"
              onClick={handleShowLess}
            >
              Show less
              <FaChevronUp className="text-xs" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;