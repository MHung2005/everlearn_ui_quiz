import { Flag } from 'lucide-react';

type QuesInfoProps = { 
  index: number; 
  ans: boolean; 
  flagged: boolean; 
};

export default function QuesInfo({index,ans,flagged, onFlag}: QuesInfoProps & { onFlag: () => void }) {
  return (
    <div className = "question-info-in">
      <h1 id={`question-${index + 1}`}>Question {index + 1}</h1>
      <p>{ans ? "Answered" : "Not yet answered"}</p>
      <button
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition"
        onClick={() => onFlag()}
      >
        <Flag className={`w-5 h-5 ${flagged ? "text-yellow-500" : "text-gray-400"}`} />
        <span className="text-sm font-medium">Flag</span>
      </button>
    </div>
  );
}
