function Footer() {
  return (
    <div
      className="absolute bottom-0 z-2 w-full flex flex-column"
      style={{
        background: "var(--highlight-bg)",
        color: "var(--highlight-text-color)",
      }}
    >
      <div className=" w-full flex flex-row md:flex-row justify-content-between p-3 xl:text-lg lg:text-lg text-sm">
        <a
          href="https://github.com/RevenBot/resumEsite"
          style={{
            textDecoration: "none",
            color: "var(--highlight-text-color)",
          }}
        >
          <img
            width={"30px"}
            src="https://skillicons.dev/icons?i=github"
            alt="repo"
          />
        </a>
        <div>06/03/2024</div>
      </div>
    </div>
  );
}

export default Footer;
