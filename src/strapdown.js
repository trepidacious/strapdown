;(function(window, document) {

  // Hide body until we're done fiddling with the DOM
  document.body.style.display = 'none';

  //////////////////////////////////////////////////////////////////////
  //
  // Extract markdown text, and replace it with a bootstrap container
  //

  var markdownEl = $("xmp:first").first();//document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0];

  if (!markdownEl.text()) {
    console.warn('No embedded Markdown found in this document for Strapdown.js to work on! Visit http://strapdownjs.com/ to learn more.');
    return;
  }

  var markdown = markdownEl.text();
  markdownEl.replaceWith($("<div id = 'content' class='container'></div>"));

  //////////////////////////////////////////////////////////////////////
  //
  // Markdown!
  //

  // Generate HTML from Markdown
  var markdownHtml = marked(markdown);

  $("#content").html(markdownHtml)

  // Prettify code elements if a language is specified in their class
  $("code").each(function(){
    var lang = this.className;
    if (lang != '') this.className = "prettyprint lang-" + lang;
  })
  prettyPrint();

  // Style tables
  $("table").addClass("table table-striped table-bordered");

  // Add ids to headers based on contents
  var headers = $(":header");
  headers.each(function(){
    this.id = this.innerHTML;
  })

  // All done - show body
  document.body.style.display = "";

})(window, document);
