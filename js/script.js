(function() {

  window.WebFontConfig = {
    google: { families: [ 'Source+Sans+Pro::latin' ] }
  };

  var repo_to_html = function(gh){
    if (gh.fork) {
      return "";
    }
    if (gh.name.indexOf(".github.com") != -1) {
      return "";
    }
    var link = gh.homepage != "" ? gh.homepage : gh.html_url;

    return "<div><a href='"+link+"'>"+
      gh.name+
      "</a><p>"+gh.description+"</p>"
  }
      
  $(function() {
    $.ajax(
      "https://api.github.com/users/williamhogman/repos?callback=?",{dataType: "jsonp"})
      .done(function(ret){
        var html = $.map(ret.data,repo_to_html).join("");
        $("#gh-repos").html(html);
      });

    var tumblr_key = "3tzcDAyoP9zRbi67ddiLWCfbswUjOSu49A8pnLQQWEuQp4eMuL";
    $.ajax(
      "http://api.tumblr.com/v2/blog/blog.whn.se/posts/text",
      {data: {api_key: tumblr_key}, dataType: "jsonp", jsonp: "jsonp"}
    ).done(function(data){
      $("#posts").html("<ul>" + $.map(data.response.posts,function(pst){
        return "<li><a href='"+pst.post_url+"'>"+pst.title+"</a></li>"
      }).join("") + "</ul>");
    });
  });


  var _s = "script",
  d = document;

  var add_script = function(src) {
    s = d.getElementsByTagName(_s)[0];
    e = d.createElement(_s);
    e.src = src;
    s.parentNode.insertBefore(e,s)
  };
  add_script(('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js');
  add_script('//platform.twitter.com/widgets.js');
  add_script("//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js");
  add_script("//coderwall.com/javascripts/jquery.coderwall.js");

})();




