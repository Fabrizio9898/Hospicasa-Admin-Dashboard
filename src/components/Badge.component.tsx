import '../styles/badge.css';

export function Badge({ children }: { children: React.ReactNode }) {
 return (
    <div className="badge-container">
      <div className="badge-content">
        {children}
      </div>
      <div className="badge-overlay">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
}