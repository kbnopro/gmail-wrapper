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
import type { ButtonHTMLAttributes } from "react";

const FunctionButton = ({
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">) => {
  return <button className="p-3 hover:bg-gray-100" {...props}></button>;
};

const Divider = () => {
  return <div className="h-2/3 border-r border-gray-200"></div>;
};

export const FunctionBar = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="flex h-fit w-full items-center justify-center">
      <div className="bottom-2 flex h-10 w-fit shrink-0 items-center justify-start border border-gray-100 bg-white shadow-md">
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().undo().run();
          }}
        >
          <ArrowUturnLeftIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().redo().run();
          }}
        >
          <ArrowUturnRightIcon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleBold().run();
          }}
        >
          <BoldIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleItalic().run();
          }}
        >
          <ItalicIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleUnderline().run();
          }}
        >
          <UnderlineIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleStrike().run();
          }}
        >
          <StrikethroughIcon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleTextAlign("left").run();
          }}
        >
          <Bars3BottomLeftIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleTextAlign("right").run();
          }}
        >
          <Bars3BottomRightIcon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <H1Icon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <H2Icon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <H3Icon className="size-4" />
        </FunctionButton>
        <Divider />
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleBulletList().run();
          }}
        >
          <ListBulletIcon className="size-4" />
        </FunctionButton>
        <FunctionButton
          onClick={() => {
            editor?.chain().focus().toggleOrderedList().run();
          }}
        >
          <NumberedListIcon className="size-4" />
        </FunctionButton>
      </div>
    </div>
  );
};
