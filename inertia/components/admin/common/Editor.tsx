import {  
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar,
    EditorProvider,
    Editor
} from "react-simple-wysiwyg";

const TextEditor = ({value,change,size='200px'}:any)=>{
    return (
        <EditorProvider>
            <Editor value={value} onChange={change} containerProps={{ style: { resize: 'vertical',height:size } }}>
                <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <BtnClearFormatting />
                    <HtmlButton />
                    <Separator />
                    <BtnStyles />
                </Toolbar>
            </Editor>
        </EditorProvider>
    );
}
export default TextEditor;