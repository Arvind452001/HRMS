export const CircularTimer = ({ seconds }) => {
  const totalSeconds = 9 * 60 * 60 + 30 * 60; // 9 hours 30 minutes
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = Math.min(seconds / totalSeconds, 1);
  const strokeDashoffset = circumference - progress * circumference;

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex justify-center items-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* 🔘 Gray Background Circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* 🔵 Blue Progress */}
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        {/* ⏱ Time Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#111"
        >
          {formatTime(seconds)}
        </text>
      </svg>
    </div>
  );
};
