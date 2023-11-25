import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

import "./variable_node.css";
import "../../../Global_CSS.css";

import saveImage from "../save.png";
import cancelImage from "../cancel.png";

export default function VariableNode({ initialData }) {
    if (!initialData.description) initialData.description = "";
    if (!initialData.type) initialData.type = "";
    if (!initialData.label) initialData.label = "";

    const [data, setData] = useState(initialData);
    
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [description, setDescription] = useState(data.description);
    const [type, setType] = useState(data.type);
    const [title, setTitle] = useState(data.label);


    const handleDescriptionChange = useCallback((evt) => {
        setDescription(evt.target.value);
        setHasUnsavedChanges(true);
    }, []);

    const handleTypeChange = useCallback((evt) => {
        setType(evt.target.value);
        setHasUnsavedChanges(true);
    }, []);

    const handleTitleChange = useCallback((evt) => {
        setTitle(evt.target.value);
        setHasUnsavedChanges(true);
    }, []);

    const handleSave = useCallback(() => {
        setHasUnsavedChanges(false);
        // TODO: Save to database and send to backend AI
        setData({
            ...data,
            description,
            type,
            label: title,
        });
    }, [description, type, title]);

    const handleCancel = useCallback(() => {
        setHasUnsavedChanges(false);
        setDescription(data.description);
        setType(data.type);
        setTitle(data.label);
    }, []);

    return (
        <div className="variableNode background_UI_Frame_1">
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Top} />
            <div className="variableNode_content">
                <div className="nodrag variableNode_title">
                    <input value={title} onChange={handleTitleChange} />

                    <div id="action_buttons" style={{ display: hasUnsavedChanges ? "block" : "none" }}>
                        <img className="variableNode_action" src={cancelImage} onClick={handleCancel} />
                        <img className="variableNode_action" src={saveImage} onClick={handleSave} />
                    </div>
                </div>
                <input className="nodrag variableNode_type background_UI_Frame_2" value={type} onChange={handleTypeChange} />
                <textarea
                    className="nodrag variableNode_description background_UI_Frame_2"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
        </div>
    );
}
