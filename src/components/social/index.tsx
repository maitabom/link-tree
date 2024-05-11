import SocialProps from "./properties";

function Social({ url, children }: SocialProps) {
  return (
    <a href={url} rel="noopener noreferer" target="_blank">
      {children}
    </a>
  );
}

export default Social;
