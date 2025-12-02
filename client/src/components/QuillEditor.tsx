import { useRef, useEffect, useState, useMemo } from 'react';
// React-Quill and Quill CSS are dynamically imported on the client
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  onUnlock: () => void;
  onFileUpload: (file: File) => void;
  isUnlocked: boolean;
  isConverting: boolean;
  onConvertClick: () => void;
  onNotification?: (message: string, type: 'info' | 'success' | 'error' | 'warning') => void;
}

export default function QuillEditor({ 
  content, 
  onChange, 
  onUnlock, 
  onFileUpload, 
  isUnlocked,
  isConverting,
  onConvertClick,
  onNotification
}: EditorProps) {
  const { t } = useTranslation();
  const quillRef = useRef<any>(null);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [editorContent, setEditorContent] = useState(content);

  // Sync external content changes to the internal state
  useEffect(() => {
    if (content !== editorContent) {
      setEditorContent(content);
    }
  }, [content]);

  // Dynamically import react-quill and styles only on client
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Ensure react-dom has a findDOMNode (React 19 splits packages and may not export it)
        const reactDomMod: any = await import('react-dom');
        // react-dom may export the API as the default export or as named exports
        const reactDom = reactDomMod.default || reactDomMod;
        if (!reactDom.findDOMNode) {
          // Lightweight polyfill: try common shapes returned by refs/components
          reactDom.findDOMNode = function (instance: any) {
            if (!instance) return null;
            // If it's already a DOM node
            if (instance.nodeType === 1 || instance.nodeType === 3) return instance;
            // If it's a ref object
            if (instance.current) return instance.current;
            // If it's a React component with a root DOM element under `.root` or `.editor` or similar
            if (instance.root && (instance.root.nodeType === 1 || instance.root.nodeType === 3)) return instance.root;
            if (instance.editor && instance.editor.root) return instance.editor.root;
            // As a last resort, return null so the calling code throws a clearer error
            return null;
          };
        }

        // Import react-quill after guaranteeing findDOMNode exists
        const mod = await import('react-quill');
        // Import CSS separately so Vite handles it as an asset
        await import('quill/dist/quill.snow.css');
        if (mounted) setReactQuill(() => mod.default || mod);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load react-quill or react-dom shim:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleQuillChange = (value: string) => {
    setEditorContent(value);
    onChange(value);
    if (value.trim().length > 0) {
      onUnlock();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 editor-container overflow-hidden flex flex-col h-[450px]">
        
        {/* Quill Editor */}
        {ReactQuill ? (
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editorContent}
            onChange={handleQuillChange}
            modules={modules}
            placeholder={t('editorPlaceholder')}
            className="flex-1 w-full focus:outline-none text-brand-dark text-lg overflow-y-auto"
          />
        ) : (
          <div className="flex-1 w-full flex items-center justify-center text-gray-400">{t('loadingEditor') || 'Loading editor...'}</div>
        )}

        {/* Bottom Action Bar */}
        <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:inline-block">{t('editorSupports')}</span>
          
          <div className="flex gap-3 w-full sm:w-auto">
                {/* Upload Button */}
              <div className="relative flex-1 sm:flex-none">
                  <input type="file" id="file-upload" className="hidden" accept=".txt,.md,.docx" onChange={handleFileChange} />
                  <label htmlFor="file-upload" className="cursor-pointer flex justify-center items-center gap-2 bg-brand-light text-brand-main font-semibold py-2 px-4 rounded-full hover:bg-red-100 transition-colors border border-transparent hover:border-brand-main w-full">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span className="whitespace-nowrap">{t('uploadDocument')}</span>
                  </label>
              </div>

              {/* Mobile Convert Button (Visible only on small screens) */}
              <button 
                onClick={onConvertClick}
                disabled={!isUnlocked || isConverting}
                className={cn(
                  "sm:hidden flex-1 bg-brand-main text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-all duration-300 flex justify-center items-center gap-2",
                  !isUnlocked ? "cursor-not-allowed opacity-90" : "cursor-pointer hover:shadow-md"
                )}
              >
                {isConverting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span className="ml-2">{t('converting')}</span>
                  </>
                ) : (
                  <>
                    {!isUnlocked && <i className="lock-icon fa-solid fa-lock text-sm"></i>}
                    <span>{t('convert')}</span>
                  </>
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
