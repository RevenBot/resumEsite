import TutoCommand from "./TutoCommand";

function InitCommand() {
  return (
    <>
      <span
        style={{
          color: "var(--green-700)",
        }}
      >
        ➜{" "}
      </span>
      npm run build resumEsite --caos
      <br />
      <span
        style={{
          color: "var(--green-700)",
        }}
      >
        ➜{" "}
      </span>
      vite v4.5.2 building for production...
      <br />
      <span
        style={{
          color: "var(--green-700)",
        }}
      >
        ✓{"    "}
      </span>
      640 modules transformed.
      <br />
      <div className="flex w-full justify-content-between">
        <div>
          dist/
          <span
            style={{
              color: "var(--green-700)",
            }}
          >
            index.html
          </span>
        </div>
        <div>0.46 kB │ gzip: 00.30 kB</div>
      </div>
      <div className="flex w-full justify-content-between">
        <div>
          dist/
          <span
            style={{
              color: "var(--pink-700)",
            }}
          >
            index.css
          </span>
        </div>
        <div>0.62 kB │ gzip: 00.38 kB</div>
      </div>
      <div className="flex w-full justify-content-between">
        <div>
          dist/
          <span
            style={{
              color: "var(--blue-700)",
            }}
          >
            index.js
          </span>
        </div>
        <div>104.63 kB │ gzip: 42.08 kB</div>
      </div>
      <br />
      <span
        style={{
          color: "var(--green-700)",
        }}
      >
        ✓{"    "}
      </span>
      built in 3.41
      <br />
      <span
        style={{
          color: "var(--green-700)",
        }}
      >
        ➜{" "}
      </span>
      tuto
      <br />
      <TutoCommand />
    </>
  );
}

export default InitCommand;
