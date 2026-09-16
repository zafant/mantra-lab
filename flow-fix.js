/* V3.7 — compatibility shim.
   app.js calls renderModuleGallery(), while the renderer is named renderGallery().
   Expose the expected name without overriding any click handlers. */
if (typeof window.renderGallery === 'function') {
  window.renderModuleGallery = window.renderGallery;
}
