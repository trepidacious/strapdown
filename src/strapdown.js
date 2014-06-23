$( document ).ready(function() {

  // Hide body until we're done fiddling with the DOM
  document.body.style.display = 'none';

  //////////////////////////////////////////////////////////////////////
  //
  // Extract markdown text from xmp element, then remove that element
  //

  var markdownEl = $("xmp:first").first();//document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0];

  if (!markdownEl.text()) {
    console.warn('No embedded Markdown found in this document for Strapdown.js to work on! Visit http://strapdownjs.com/ to learn more.');
    return;
  }

  var markdown = markdownEl.text();
  markdownEl.remove();

  //////////////////////////////////////////////////////////////////////
  //
  // Markdown!
  //

  // Generate HTML from Markdown
  var markdownHtml = marked(markdown);

  // Put the HTML in element with class "markdown-content"
  $(".markdown-content").html(markdownHtml)

  // Prettify code elements if a language is specified in their class,
  // e.g. via GitHub style 
  //
  //    ```ruby
  //    print("hello world")
  //    ```
  //
  $("code").each(function(){
    var lang = this.className;
    if (lang != '') this.className = "prettyprint lang-" + lang;
  })
  prettyPrint();

  // Style tables for bootstrap
  $("table").addClass("table table-striped table-bordered");

  //Process all headers within markdown
  var headers = $(".markdown-content").find(":header");
  var toc = "<ul>";
  headers.each(function(){
    var text = $(this).text();
    var id = "header-" + text;
    // Add ids to headers based on contents, helps with TOC etc.
    this.id = id;
    // $(this).addClass("page-header")
    // Build a TOC
    toc = toc + '<li><a href="#' + id + '">' + text + '</a></li>'
  })
  toc = toc + "</ul>"

  //Add toc in element with class "markdown-content"
  $(".markdown-toc").html(toc)

  // Make images responsive
  $("img").addClass("img-responsive");

  // All done - show body
  document.body.style.display = "";

})
