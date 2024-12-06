{
    "name": "Dudoxx Extensions",
    "version": "16.0.1.0.0",
    "author": "Dudoxx UG, Walid Boudabbous (CTO)",
    "license": "LGPL-3",
    "depends": ["web"],
    "data": [
        "security/ir.model.access.csv",
        "views/markdown_test_views.xml",
        "data/sample_data.xml",
    ],
    "assets": {
        "web.assets_backend": [
            # External libraries
            "https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js",
            
            # Local CSS
            "dudoxx_extensions/static/src/css/markdown_field.css",
            
            # Local JS files
            "dudoxx_extensions/static/src/js/marked_service.js",
            "dudoxx_extensions/static/src/js/markdown_field.js",
            
            # XML Templates
            "dudoxx_extensions/static/src/xml/markdown_field.xml",
        ],
    },
    "installable": True,
    "application": False,
}
