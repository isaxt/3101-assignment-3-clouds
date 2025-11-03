import { useState } from "react";
import { createRoot } from "react-dom/client";


// glob-- general import all photos from each time slot in the folder
const morningPhotos = import.meta.glob('./photos/morning/*.jpg', { eager: true, as: 'url' });
const afternoonPhotos = import.meta.glob('./photos/afternoon/*.jpg', { eager: true, as: 'url' });
const eveningPhotos = import.meta.glob('./photos/evening/*.jpg', { eager: true, as: 'url' });

console.log(afternoonPhotos);
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
    photos: Object.values(morningPhotos),
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
    photos: Object.values(afternoonPhotos),
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
    photos: Object.values(eveningPhotos),
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