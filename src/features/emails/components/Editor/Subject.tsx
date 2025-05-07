import { useEditorStore } from "../../stores/editor";

export const Subject = () => {
  const subject = useEditorStore((state) => state.subject);
  const setSubject = useEditorStore((state) => state.setSubject);
  return (
    <div className="flex h-10 w-full shrink-0 items-center border-b">
      <input
        className="w-full text-sm text-gray-700 placeholder:text-gray-500 focus:outline-0"
        placeholder="Subject"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      />
    </div>
  );
};
