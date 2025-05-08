import DOMPurify from "isomorphic-dompurify";

export const RawHtml = ({
  html,
  className,
}: {
  html: string;
  className?: string;
}) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    ></div>
  );
};
