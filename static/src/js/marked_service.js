/** @odoo-module **/

import { registry } from "@web/core/registry";

export const markedService = {
    dependencies: [],
    start() {
        console.log("[DDX] MarkedService start - Initializing...");
        
        // Configure marked options
        window.marked.setOptions({
            gfm: true,            // GitHub Flavored Markdown
            breaks: true,         // Add <br> on single line breaks
            smartLists: true,     // Use smarter list behavior
            smartypants: true,    // Use smart punctuation
            xhtml: true,          // Use self-closing tags
        });
        
        console.log("[DDX] MarkedService start - Marked configured with options");

        return {
            parse(text) {
                console.log("[DDX] MarkedService parse - Input:", text);
                if (!text) {
                    console.log("[DDX] MarkedService parse - Empty input, returning empty string");
                    return "";
                }
                
                try {
                    // Pre-process custom markdown syntax
                    text = text.replace(/##(.*?)##/g, "**$1**");
                    console.log("[DDX] MarkedService parse - After pre-processing:", text);
                    
                    // Parse markdown
                    const result = window.marked.parse(text);
                    console.log("[DDX] MarkedService parse - Output:", result);
                    return result;
                } catch (error) {
                    console.error("[DDX] MarkedService parse - Error:", error);
                    return text;
                }
            }
        };
    }
};

registry.category("services").add("marked", markedService);
