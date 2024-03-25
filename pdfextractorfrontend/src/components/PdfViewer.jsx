import React, { useEffect, useRef } from 'react';
import pdfjs from 'pdfjs-dist';

function PdfViewer({ pdfUrl }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const renderPdf = async () => {
            try {
                // Initialize PDF.js
                const pdf = await pdfjs.getDocument(pdfUrl).promise;
                
                // Render the first page of the PDF
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1 });
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;
            } catch (error) {
                console.error('Error rendering PDF:', error);
            }
        };

        renderPdf();
    }, [pdfUrl]);

    return <canvas ref={canvasRef} />;
}

export default PdfViewer;
