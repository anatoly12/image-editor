import { useCallback, useMemo, useRef, useState } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import "./App.css";
import ImageEditor from "./ImageEditor";

function App() {
  const editorConfig = useMemo(
    () => ({
      includeUI: {
        menu: ["crop", "resize", "draw", "text", "mask", "icon"], // we can hide existing features to create our elements like we did for the flip
        uiSize: {
          height: "80vh",
          width: "100vw",
        },
      },
      cssMaxWidth: 700,
      cssMaxHeight: 500,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    }),
    []
  );
  const editorInstanceRef = useRef();

  const setEditorRef = useCallback((ref) => {
    if (ref) {
      editorInstanceRef.current = ref;
    }
  }, []);

  const flipImageByAxis = useCallback((isXAxis) => {
    const instance = editorInstanceRef.current.getInstance();
    if (instance) {
      isXAxis ? instance.flipX() : instance.flipY();
    }
  }, []);

  const [imageUrl, setImageUrl] = useState("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg");
  const setEditorImage = useCallback(() => {
    const instance = editorInstanceRef.current.getInstance();
    if (instance) {
      instance.loadImageFromURL(instance.toDataURL(), "FilterImage").then(function () {
        instance.addImageObject(imageUrl).then(function (objectProps) {
          console.log(objectProps);
        });
      });
    }
  }, [imageUrl]);

  return (
    <div className="editor-wrapper">
      <ImageEditor ref={setEditorRef} {...editorConfig} />
      <div className="d-flex">
        <input onChange={setImageUrl} value={imageUrl} />
        <button onClick={setEditorImage}>Load External Image</button>
      </div>
      <div className="d-flex">
        <button
          onClick={() => {
            flipImageByAxis(true);
          }}
        >
          Flip-X!
        </button>
        <button
          onClick={() => {
            flipImageByAxis(false);
          }}
        >
          Flip-Y!
        </button>
      </div>
    </div>
  );
}

export default App;
