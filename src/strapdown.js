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
  var headers = $(".markdown-content").find("h1, h2, h3, h4, h5, h6");
  var toc = '';
  var previousLevel = 0;
  var levelNames = ["", "", "", "", "", ""]
  headers.each(function(){

    //Use zero-based level numbering - h1 is level 0
    var level = this.tagName[1] - 1

    //Get text in header, and sanitise to use as part of an id
    var text = $(this).text();
    var idText = text.replace(/[^a-zA-Z0-9_]+/g, "_")

    //The sanitised text is now the name for the current level, until
    //replaced by another heading at the same level
    levelNames[level] = idText

    //Now build the actual id, starting with Section__ to avoid conflicts and ensure id starts with an alphabetic character
    var id = "Section__";
    for (i = 0; i < level; i++) {
     id += levelNames[i] + "__";
    }
    id += idText;
    
    // Add ids to headers based on contents, helps with TOC etc.
    this.id = id;

    //Add the header to the TOC, using nested ul's
    if (previousLevel == level) {
      toc += '</li>';
    } else {
      while (previousLevel < level) {
        toc += '<ul class="nav">';
        previousLevel++;
      }
      while (previousLevel > level) {
        toc += '</li></ul></li>';
        previousLevel--;
      }
    }
    toc += '<li><a href="#' + id + '">' + text + '</a>'
  })

  //Add toc in element with class "markdown-content"
  $(".markdown-toc").html(toc)

  // Make images responsive
  $("img").addClass("img-responsive");

  // All done - show body
  document.body.style.display = "";

})
