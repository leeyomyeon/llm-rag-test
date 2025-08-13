import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MarkDownForm({ markdownText }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}  components={{
    }}>
      {markdownText}
    </ReactMarkdown>
  );
}

export default MarkDownForm;