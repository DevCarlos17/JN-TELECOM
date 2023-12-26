import CopyToClipboard from "react-copy-to-clipboard";

const CopyToClipboardButton = ({ textToCopy, buttonText, style }) => {
  return (
    <div>
      <CopyToClipboard text={textToCopy}>
        <button className={style}>
          <span className="font-bold text-white">{buttonText}</span>
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyToClipboardButton;
