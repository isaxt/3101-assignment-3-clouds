import { useState } from "react";
import { createRoot } from "react-dom/client";

// defines time slots + background colors + ASCII art
const TIME_OPTIONS = {
  morning: {
    label: "2:22 – 2:51 PM",
    color: "#b8d8ff",
    ascii: `
       (  )   (   )  ) (  )   (   )  ) (  )   (   )  ) (  )   (   )  )
        ) (   )  (  (  ) (   )  (  (  ) (   )  (  (  ) (   )  (  (
        ( )  (    ) )( )  (    ) )( )  (    ) )
        ............... ............... ............... ...............
       (______________)(______________)(______________)
    `,
    photos: ["source/photos/morning/IMG_4756.jpg", "source/photos/morning/IMG_4757.jpg", "source/photos/morning/IMG_4758.jpg",
    "source/photos/morning/IMG_4759.jpg", "source/photos/morning/IMG_4760.jpg", "source/photos/morning/IMG_4796.jpg", 
    "source/photos/morning/IMG_4799.jpg", "source/photos/morning/IMG_4800.jpg", "source/photos/morning/IMG_4801.jpg", 
    "source/photos/morning/IMG_4859.jpg", "source/photos/morning/IMG_4860.jpg"
    ],
  },
  afternoon: {
    label: "2:54 – 3:48 PM",
    color: "#89c2ff",
    ascii: `
        ~~~~~~~~ ~~~~~~~~~~~ ~~~~~~~~~~~ ~~~
       (    ~~~     )(    ~~~     )(    ~~~     )
        ~~~~~~~~~~~~ ~~~~~~~~~~~~ ~~~~~~~~~~~~ ~~~~~~~~~~~~
      (    ~~~     )(    ~~~     )(    ~~~     )
         ~~~~~~~~~~~~ ~~~~~~~~~~~~ ~~~~~~~~~~~~
    `,
    photos: ["source/photos/afternoon/IMG_4716.jpg", "source/photos/afternoon/IMG_4717.jpg", 
    "source/photos/afternoon/IMG_4718.jpg", "source/photos/afternoon/IMG_4720.jpg", 
    "source/photos/afternoon/IMG_4721.jpg", "source/photos/afternoon/IMG_4722.jpg", 
    "source/photos/afternoon/IMG_4723.jpg", "source/photos/afternoon/IMG_4724.jpg", 
    "source/photos/afternoon/IMG_4725.jpg", "source/photos/afternoon/IMG_4726.jpg", 
    "source/photos/afternoon/IMG_4761.jpg", "source/photos/afternoon/IMG_4802.jpg", 
    "source/photos/afternoon/IMG_4803.jpg", "source/photos/afternoon/IMG_4804.jpg"],
  },
  evening: {
    label: "4:00 – 5:53 PM",
    color: "#6da9e4",
    ascii: `
       *     .--.
        .  /   o\\
         .*|     |
           '--.o.'
    `,
    photos: ["photos/evening/cloud1.jpg", "photos/evening/cloud2.jpg"],
  },
};

function App() {
  const [selectedTime, setSelectedTime] = useState("morning");
  const { color, ascii, photos } = TIME_OPTIONS[selectedTime];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "monospace",
        backgroundColor: color,
      }}
    >
      {/* left side menu */}
      <div
        style={{
          width: "20%",
          padding: "2rem",
          background: "#fff",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ fontFamily: "sans-serif", fontWeight: "normal" }}>
            overcast.exe
          </h2>

          <p style={{ marginTop: "2rem" }}>pick a time interval</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(TIME_OPTIONS).map(([key, option]) => (
              <li
                key={key}
                style={{
                  cursor: "pointer",
                  textDecoration:
                    selectedTime === key ? "underline" : "none",
                  marginBottom: "0.5rem",
                }}
                onClick={() => setSelectedTime(key)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          react site project<br />
          about clouds<br />
          overlaying images<br />
          I took with ascii<br />
          clouds
        </div>
      </div>

      {/* right display area */}
      <div
        style={{
          flexGrow: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* ASCII art */}
        <pre
          style={{
            color: "#502f2f",
            opacity: 0.7,
            whiteSpace: "pre",
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          {ascii}
        </pre>

        {/* cloud images overlay */}
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="cloud"
            style={{
              position: "absolute",
              top: `${20 + i * 20}%`,
              left: `${20 + i * 15}%`,
              width: "180px",
              height: "auto",
              borderRadius: "4px",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              transition: "all 0.5s ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
}

window.addEventListener("load", () => {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
});