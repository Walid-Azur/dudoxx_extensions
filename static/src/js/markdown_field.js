/** @odoo-module **/

import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { useService } from "@web/core/utils/hooks";
import { Field } from "@web/views/fields/field";
import { markup } from "@odoo/owl";

export class MarkdownField extends Field {
  setup() {
    super.setup();
    console.log("[DDX] MarkdownField setup - Initializing...");
    this.marked = useService("marked");
    console.log("[DDX] MarkdownField setup - Marked service loaded:", !!this.marked);
  }

  cleanHtml(html) {
    console.log("[DDX] MarkdownField cleanHtml - Input:", html);
    // Remove HTML comments
    html = html.replace(/<!--[\s\S]*?-->/g, "");

    // Remove extra spaces between tags
    html = html.replace(/>\s+</g, "><");

    // Remove empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, "");

    const cleaned = html.trim();
    console.log("[DDX] MarkdownField cleanHtml - Output:", cleaned);
    return cleaned;
  }

  convertHtmlToMarkdown(html) {
    console.log("[DDX] MarkdownField convertHtmlToMarkdown - Input:", html);
    // Clean the HTML first
    html = this.cleanHtml(html);

    // Convert HTML entities
    html = html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Convert HTML to Markdown
    let markdown = html
      // Headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/g, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/g, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/g, "### $1\n\n")
      .replace(/<h[4-6][^>]*>(.*?)<\/h[4-6]>/g, "#### $1\n\n")

      // Basic formatting
      .replace(/<strong[^>]*>(.*?)<\/strong>/g, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/g, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/g, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/g, "*$1*")
      .replace(/<del[^>]*>(.*?)<\/del>/g, "~~$1~~")

      // Lists
      .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (match, content) => {
        return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, "- $1\n");
      })
      .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, (match, content) => {
        let counter = 1;
        return content.replace(
          /<li[^>]*>([\s\S]*?)<\/li>/g,
          () => `${counter++}. $1\n`
        );
      })

      // Links and images
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, "[$2]($1)")
      .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, "![]($1)")

      // Blockquotes
      .replace(
        /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g,
        (match, content) => {
          return content
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n");
        }
      )

      // Code blocks
      .replace(
        /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
        "```\n$1\n```"
      )
      .replace(/<code[^>]*>(.*?)<\/code>/g, "`$1`")

      // Line breaks and paragraphs
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, "$1\n\n")
      .replace(/<hr\s*\/?>/g, "\n---\n");

    // Clean up extra whitespace
    markdown = markdown
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .replace(/^\s+|\s+$/g, "");

    console.log("[DDX] MarkdownField convertHtmlToMarkdown - Output:", markdown);
    return markdown;
  }

  get formattedValue() {
    const value = this.props.record.data[this.props.name];
    console.log("[DDX] MarkdownField formattedValue - Input:", value);
    
    if (!value) {
      console.log("[DDX] MarkdownField formattedValue - No value, returning empty string");
      return "";
    }

    try {
      // First convert HTML to Markdown
      const markdown = this.convertHtmlToMarkdown(value);
      console.log("[DDX] MarkdownField formattedValue - Converted to markdown:", markdown);

      // Then parse the markdown using the service and create a trusted HTML object
      const parsed = this.marked.parse(markdown);
      console.log("[DDX] MarkdownField formattedValue - Final HTML output:", parsed);
      
      // Return the HTML wrapped in markup to prevent escaping
      return markup(parsed);
    } catch (error) {
      console.error("[DDX] MarkdownField formattedValue - Error:", error);
      return value;
    }
  }
}

MarkdownField.template = "dudoxx_extensions.MarkdownField";
MarkdownField.components = {};
MarkdownField.props = {
  ...standardFieldProps,
};
MarkdownField.supportedTypes = ["text", "html"];

// Register with new name ddx_markdown
registry.category("fields").add("ddx_markdown", MarkdownField);
