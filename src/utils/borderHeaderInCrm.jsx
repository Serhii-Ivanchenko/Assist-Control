
export  const borderHeaderInCrm = (index, className) => {
    const svgData = [
      null,
      { fill: "var(--blue)" },
      { fill: "#994CA5" },
      { fill: "#246D4D" },
    ];
  
    if (!svgData[index]) return null;
  
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="61"
        viewBox="0 0 12 61"
        fill="none"
        className={className}      >
        <path
          d="M0 0.253906H3.02041L11.3265 30.5079L3.02041 60.7618H0L8.30612 30.5079L0 0.253906Z"
          fill={svgData[index].fill}
        />
      </svg>
    );
  };