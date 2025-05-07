import {CheckCircle, PlayCircle } from "lucide-react";
import React, { useState } from "react";

const sessions = [
  "Consectetur adipiscing elit",
  "Molilt voluptate adipiscing",
  "Officia pariatur Lorem sit",
  "Arvoluptate adipiscing",
  "Exercitation elit incididunt esse",
  "Deserunt pariatur eiusm"
];

const SessionList = ()=>{
   const [completedSessions, setCompletedSessions] = useState(3);
    const [activeSession, setActiveSession] = useState(3);
    return (
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#4D55CC]">Sessions <span className="text-gray-500">{completedSessions}/12 Completed</span></h3>
        <ul className="mt-3 space-y-2">
          {sessions.map((session, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-all font-semibold ${
                index === activeSession ? "bg-pink-200 text-pink-600" : "text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSession(index)}
            >
              <span>{index + 1}. {session}</span>
              {index === activeSession ? <PlayCircle className="text-pink-600 w-5 h-5" /> : index < completedSessions && <CheckCircle className="text-[#4D55CC] w-5 h-5" />}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
export default SessionList