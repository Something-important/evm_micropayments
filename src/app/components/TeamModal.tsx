import React from "react";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

type TeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
};

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
        <p className="text-muted-foreground mb-2">{member.role}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamModal;
