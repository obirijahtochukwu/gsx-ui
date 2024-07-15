import useLocalStorage from "@/lib/hooks/local-storage";
import { Token } from "@/lib/hooks/swap/useSwap.d";

export const Coin = ({
  duplicateItem,
  setDuplicateItem,
  token,
  idx,
  name,
  symbol,
  Logo,
}: {
  token: Token;
  idx: number;
  name?: string;
  symbol?: string;
  Logo: any;
  duplicateItem: any;
  setDuplicateItem: React.Dispatch<null>;
}) => {
  const [draggedItem, setDraggedItem] = useLocalStorage({
    key: "draggedItem",
    initialValue: "",
  });

  const handleDragStart = (event: any, id: number) => {
    // event.preventDefault();
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...token, id: idx })
    );
    setDraggedItem(token);

    // Create a duplicate item
    const clone = event.target.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.pointerEvents = "none";
    clone.style.opacity = "1";
    clone.style.zIndex = "100";
    document.body.appendChild(clone);
    // Prevent default drag behavior or
    // Hide native drag image
    const hideImg = new Image();
    hideImg.src = "";
    event.dataTransfer.setDragImage(hideImg, 0, 0);
    event.dataTransfer.effectAllowed = "copy";
    // Optional: Set the drag effect
    setDuplicateItem(clone);
  };

  const handleDrag = (event: any) => {
    if (duplicateItem) {
      duplicateItem.style.left = event.clientX + "px";
      duplicateItem.style.top = event.clientY + "px";
      duplicateItem.style.transform = `translateX(-60px) rotate(${
        draggedItem.category == "toTokens" ? "45deg" : "-45deg"
      })`;
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    if (duplicateItem) {
      document.body.removeChild(duplicateItem);
      setDuplicateItem(null);
    }
  };

  return (
    <article
      draggable
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onDragStart={(e) => handleDragStart(e, idx)}
      className="shadow-token col-span-12 bg-white rounded-2xl flex items-center cursor-grab font-normal text-muted px-4 h-16 gap-1.5 hover:border-secondary border-4 border-transparent hover:shadow-none duration-50 text-xs"
    >
      <div className="">
        <Logo className="h-8 w-8" />
      </div>
      <div className="">
        <div className={`capitalize font-bold`}>{name}</div>
        <div className=" uppercase">{symbol}</div>
      </div>
    </article>
  );
};
