from odoo import models, fields, api

class DudoxxMarkdownTest(models.Model):
    _name = 'dudoxx.markdown.test'
    _description = 'Test Model for Quill and Marked Services'

    name = fields.Char(string="Title", required=True)
    quill_text = fields.Html(string="Quill Text")
    markdown_text = fields.Text(string="Markdown Text")
    rendered_markdown = fields.Html(string="Rendered Markdown", compute='_compute_rendered_markdown', store=False)

    @api.depends('markdown_text')
    def _compute_rendered_markdown(self):
        for record in self:
            # This will be rendered client-side using the marked service
            record.rendered_markdown = record.markdown_text or ''
