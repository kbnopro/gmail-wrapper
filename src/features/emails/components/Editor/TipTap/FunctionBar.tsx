import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  BoldIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  ItalicIcon,
  ListBulletIcon,
  NumberedListIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@heroicons/react/24/outline";
import type { Editor } from "@tiptap/core";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

const FunctionButton = ({
  active,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  active?: boolean;
}) => {
  return (
    <button
      className={clsx(
        "flex size-7 items-center justify-center rounded-md",
        active ? "bg-gray-200/70" : "hover:bg-gray-100/70",
      )}
      {...props}
    ></button>
  );
};

const Divider = () => {
  return <div className="h-2/3 border-r border-gray-200"></div>;
};

export const FunctionBar = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="flex h-fit w-full items-center justify-center">
      <div className="bottom-2 flex h-10 w-fit shrink-0 items-center justify-center gap-2 border border-gray-100 bg-white px-2 shadow-md">
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().undo().run();
          }}
          active={false}
        >
          <ArrowUturnLeftIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().redo().run();
          }}
          active={false}
        >
          <ArrowUturnRightIcon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleBold().run();
          }}
          active={editor?.isActive("bold")}
        >
          <BoldIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleItalic().run();
          }}
          active={editor?.isActive("italic")}
        >
          <ItalicIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleUnderline().run();
          }}
          active={editor?.isActive("underline")}
        >
          <UnderlineIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleStrike().run();
          }}
          active={editor?.isActive("strike")}
        >
          <StrikethroughIcon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleTextAlign("left").run();
          }}
          active={editor?.isActive({ textAlign: "left" })}
        >
          <Bars3BottomLeftIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleTextAlign("right").run();
          }}
          active={editor?.isActive({ textAlign: "right" })}
        >
          <Bars3BottomRightIcon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          active={editor?.isActive("heading", { level: 1 })}
        >
          <H1Icon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          active={editor?.isActive("heading", { level: 2 })}
        >
          <H2Icon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          active={editor?.isActive("heading", { level: 3 })}
        >
          <H3Icon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleBulletList().run();
          }}
          active={editor?.isActive("bulletList")}
        >
          <ListBulletIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleOrderedList().run();
          }}
          active={editor?.isActive("orderedList")}
        >
          <NumberedListIcon className="size-4" />
        </FunctionButton>
      </div>
    </div>
  );
};
