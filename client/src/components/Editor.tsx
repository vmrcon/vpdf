import { useRef, useEffect } from 'react';
import { cn, textToHtml } from '@/lib/utils';
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

export default function Editor({ 
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
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const isHtml = /<[^>]+>/.test(content);
    const html = isHtml ? content : textToHtml(content);

    if (editorRef.current.innerHTML !== html) {
      editorRef.current.innerHTML = html;
    }
  }, [content]);

  const handleBlur = () => {
    if (editorRef.current) {
      const innerHTML = editorRef.current.innerHTML || '';
      const innerText = editorRef.current.innerText || '';

      const normalizedFromText = textToHtml(innerText);
      const hasFormatting = innerHTML !== normalizedFromText;

      const newContent = hasFormatting ? innerHTML : innerText;
      onChange(newContent);
      if (newContent.trim().length > 0) {
        onUnlock();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  };

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    
    // Manually trigger content update for select-based changes (font/size)
    if (editorRef.current && (command === 'fontSize' || command === 'fontName')) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toggleList = (type: 'ordered' | 'unordered') => {
    const command = type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList';
    
    // Check if the list is already active
    const isList = document.queryCommandState(command);
    
    if (isList) {
      // If the list is active, turn it off
      document.execCommand(command, false);
    } else {
      // If the list is not active, turn it on
      document.execCommand(command, false);
    }
  
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 editor-container overflow-hidden flex flex-col h-[450px]">
        
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex gap-2 items-center flex-wrap">
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('bold')} className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Bold">
            <i className="fa-solid fa-bold"></i>
          </button>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('italic')} className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Italic">
            <i className="fa-solid fa-italic"></i>
          </button>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('underline')} className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Underline">
            <i className="fa-solid fa-underline"></i>
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <select onMouseDown={(e) => e.preventDefault()} onChange={(e) => applyFormat('fontSize', e.target.value)} className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors bg-transparent" title="Font Size">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <select onMouseDown={(e) => e.preventDefault()} onChange={(e) => applyFormat('fontName', e.target.value)} className="p-1 text-gray-600 hover:bg-gray-200 rounded transition-colors bg-transparent" title="Font Family">
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('justifyLeft')} className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Align Left">
            <i className="fa-solid fa-align-left"></i>
          </button>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('justifyCenter')} className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Align Center">
            <i className="fa-solid fa-align-center"></i>
          </button>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat('justifyRight')} className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors" title="Align Right">
            <i className="fa-solid fa-align-right"></i>
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
        </div>

        {/* Text Input Area */}
        <div
          ref={editorRef}
          contentEditable
          onBlur={handleBlur}
          className="flex-1 w-full p-4 focus:outline-none text-brand-dark text-lg overflow-y-auto whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: /<[^>]+>/.test(content) ? content : textToHtml(content) }}
          {...{ placeholder: t('editorPlaceholder') }}
          id="text-input-area" // ID kept for PDF generation targeting
        ></div>

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
