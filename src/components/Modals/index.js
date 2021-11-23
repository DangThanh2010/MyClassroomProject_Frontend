import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { useDialog } from "react-st-modal";
import "./index.css";

// The element to be shown in the modal window
export default function ShowBoardURLModal({ URL }) {
  const dialog = useDialog();

  const [value, setValue] = useState();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setValue(URL);
  }, []);

  return (
    <div className="ShowBoardURLModal_body">
      <input disabled="true" type="text" value={value} />

      <CopyToClipboard text={URL} onCopy={() => setCopied(true)}>
        <Button
          variant="outline-secondary"
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            marginLeft: "1rem",
            marginBottom: "4px",
          }}
        >
          <MdContentCopy></MdContentCopy> {copied ? "Copied" : "Copy"}
        </Button>
      </CopyToClipboard>
    </div>
  );
}

