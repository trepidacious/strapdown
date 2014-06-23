;(function(window, document) {

  //////////////////////////////////////////////////////////////////////
  //
  // Shims for IE < 9
  //

  document.head = document.getElementsByTagName('head')[0];

  if (!('getElementsByClassName' in document)) {
    document.getElementsByClassName = function(name) {
      function getElementsByClassName(node, classname) {
        var a = [];
        var re = new RegExp('(^| )'+classname+'( |$)');
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))a.push(els[i]);
        return a;
      }
      return getElementsByClassName(document.body, name);
    }
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Get user elements we need
  //

  var markdownEl = document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0];

  if (!markdownEl) {
    console.warn('No embedded Markdown found in this document for Strapdown.js to work on! Visit http://strapdownjs.com/ to learn more.');
    return;
  }

  // Hide body until we're done fiddling with the DOM
  document.body.style.display = 'none';

  //////////////////////////////////////////////////////////////////////
  //
  // <body> stuff
  //

  var markdown = markdownEl.textContent || markdownEl.innerText;

  var newNode = document.createElement('div');
  newNode.className = 'container';
  newNode.id = 'content';
  document.body.replaceChild(newNode, markdownEl);

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
