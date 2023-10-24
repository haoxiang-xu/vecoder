import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import "./description_node.css";
import "../../Global_CSS.css";

import tempImage from "./js.png";

function DescriptionNode({ data }) {
    const descChange = useCallback((evt) => {
        console.log(evt.target.value);
        // TODO: Show save button, when save button pressed, save to database and send to backend AI
    }, []);

    return (
        <div className="descriptionNode background_UI_Frame_1">
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
            <div className="descriptionNode_content">
                <div className="descriptionNode_title">
                    <img
                        className="descriptionNode_icon"
                        src={tempImage}
                    />
                    <label className="descriptionNode_label">
                        {data.label}
                    </label>
                </div>

                <textarea
                    id={data.nodeID}
                    onChange={descChange}
                    className="nodrag background_UI_Frame_2"
                >
                    {data.description}
                </textarea>
            </div>
        </div>
    );
}

export default DescriptionNode;
