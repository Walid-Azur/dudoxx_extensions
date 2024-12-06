/** @odoo-module **/

import { registry } from "@web/core/registry";
import { loadJS, loadCSS } from "@web/core/assets";

export const quillService = {
    dependencies: [],
    async start() {
        // Check if Quill is available
        if (typeof window.Quill === "undefined") {
            try {
                await loadJS("/dudoxx_extensions/static/src/lib/quill.min.js");
                await loadCSS("/dudoxx_extensions/static/src/lib/quill.snow.css");
            } catch (localError) {
                console.warn("Failed to load Quill locally:", localError);
                try {
                    await loadJS("https://cdn.quilljs.com/1.3.6/quill.min.js");
                    await loadCSS("https://cdn.quilljs.com/1.3.6/quill.snow.css");
                } catch (cdnError) {
                    console.error("Failed to load Quill from CDN:", cdnError);
                    return null;
                }
            }
        }

        return {
            createEditor: (container, options = {}) => {
                if (!window.Quill) {
                    console.error("Quill not available");
                    return null;
                }

                const defaultOptions = {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'script': 'sub'}, { 'script': 'super' }],
                            [{ 'indent': '-1'}, { 'indent': '+1' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ]
                    }
                };

                const mergedOptions = { ...defaultOptions, ...options };
                return new window.Quill(container, mergedOptions);
            }
        };
    },
};

registry.category("services").add("quill", quillService);
