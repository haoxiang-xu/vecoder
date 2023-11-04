import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { useState } from "react";

import "./description_node.css";
import "../../Global_CSS.css";

import tempImage from "./js.png";
import saveImage from "./save.png";
import cancelImage from "./cancel.png";

function DescriptionNode({ data }) {
    const descChange = useCallback((evt) => {
        setTextAreaValue(evt.target.value);
        setIsUnsaved(true);
    }, []);

    const handleSave = useCallback(() => {
        setIsUnsaved(false);
        // TODO: Save to database and send to backend AI
    }, []);

    const handleCancel = useCallback(() => {
        setIsUnsaved(false);
        setTextAreaValue(data.description);
    }, []);

    const [isUnsaved, setIsUnsaved] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState(data.description);

    return (
        <div className="descriptionNode background_UI_Frame_1">
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
            <div className="descriptionNode_content">
                <div className="descriptionNode_title">
                    <img className="descriptionNode_icon" src={tempImage} />
                    <label className="descriptionNode_label">
                        {data.label}
                    </label>
                    <div
                        id="action_buttons"
                        style={{ display: isUnsaved ? "block": "none" }}
                    >
                        <img
                            className="descriptionNode_action"
                            src={cancelImage}
                            onClick={handleCancel}
                        />
                        <img
                            className="descriptionNode_action"
                            src={saveImage}
                            onClick={handleSave}
                        />
                    </div>
                </div>

                <textarea
                    id={data.nodeID}
                    onChange={descChange}
                    className="nodrag background_UI_Frame_2"
                    value={textAreaValue}
                />
            </div>
        </div>
    );
}

export default DescriptionNode;
