import Image from "next/image";

export const Footer = () => {
  return (
    <footer>
      <a
        href="https://github.com/kalyberk/cognicraft"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/github.png"
          alt="GitHub logo"
          width="20"
          height="20"
        />
      </a>
    </footer>
  );
};
