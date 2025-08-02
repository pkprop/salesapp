import React, { lazy, Suspense, useEffect, useState } from "react";
//import { CKEditor } from '@ckeditor/ckeditor5-react';
//import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import { FormatPainter } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
const CKEditor = lazy(() =>
  import("@ckeditor/ckeditor5-react").then((mod) => ({ default: mod.CKEditor }))
);

const ClassicEditor:any = lazy(async () => {
  const mod:any = await import("ckeditor5");
  return { default: mod.default };
});
 //const ClassicEditor = lazy(() =>import("ckeditor5"));

export default function EditorComponent({ value, onChange }: { value: string; onChange: (data: string) => void }) {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEditorLoaded(true);
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading editor...</p>}>
      {editorLoaded && CKEditor && ClassicEditor && (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => onChange(editor.getData())}
        />
      )}
    </Suspense>
  );
}
