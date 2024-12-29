import React from "react";

const darkColors = {
   "--primary-bg": "#343434",
   "--button-shadow": "#755849"
};

const lightColors = {
   "--primary-bg": "white",
   "--button-shadow": "#d3d3d3"
};

const ThemeButton: React.FC = () => {
   const flipTheme = () => {
      let root = document.querySelector(":root")! as HTMLElement;
      const isDarkNow = root.classList.contains("dark");
      const newColors = isDarkNow ? lightColors : darkColors;
      Object.entries(newColors).forEach((e) => root.style.setProperty(e[0], e[1]));

      if (isDarkNow) {
         root.classList.remove("dark");
      } else {
         root.classList.add("dark");
      }
   };

   return (
      <div
         style={{
            width: "50px",
            height: "50px",
            borderRadius: "5px",
            backgroundColor: "var(--primary-comp-bg)",
            color: "var(--primary-comp)",
            boxShadow: "0 0 8px 2px var(--button-shadow)",
            fontSize: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            gridArea: 'theme-btn'
         }}
         onClick={flipTheme}
      >
         <div style={{ position: "relative", top: "-2px" }}>&#x2699;</div>
      </div>
   );
};

export default ThemeButton;
