import { useEffect, useState } from "react";

export default function ConsoleText({ msg }) {
  const [classes, setClasses] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (msg.status == 0) {
      setClasses("text-blue-400");
      setContent(msg.content);
    } else if (msg.status == 1) {
      setClasses("text-blue-600");
      setContent("Done creating the shader.");
    } else if (msg.status == 2) {
      setClasses("text-green-200");
      setContent(msg.content);
    }
  }, [msg]);

  return (
    <>
      <p className={classes}>{content}</p>
    </>
  );
}
