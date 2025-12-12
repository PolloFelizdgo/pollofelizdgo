"use client";

import Script from "next/script";

export default function JotFormScript() {
  return (
    <>
      {/* JotForm Chatbot Script */}
      <Script
        src="https://cdn.jotfor.ms/agent/embedjs/019a82ec0ebe7df7b95fbd487c25eb7e4b22/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('JotForm chatbot script loaded');
        }}
      />
      
      {/* Listener para capturar eventos de JotForm */}
      <Script id="jotform-listener" strategy="lazyOnload">
        {`
          window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'jotform') {
              console.log('JotForm Event:', event.data);
              
              if (event.data.action === 'submit') {
                fetch('/api/jotform', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    action: 'submit',
                    data: event.data.submission
                  })
                }).then(response => response.json())
                  .then(data => console.log('Submission saved:', data))
                  .catch(err => console.error('Error saving submission:', err));
              }
            }
          });
        `}
      </Script>
    </>
  );
}
