$('div .dropdown-menu a').on( "click", "span", function(e) {
        // debugger
        e.stopPropagation()
        $('div .dropdown-menu span:first-child').addClass( "preivew_disable" )
        $('#userThemeCSS').remove()
        console.log(e.target.innerText, e.target)
        let textContent = e.target.innerText.replace("✔️", "")
        console.log(textContent)
        if (textContent != '默认') {
             $('head').append('<link id="userThemeCSS" rel="stylesheet" type="text/css" href="res/' + textContent + '.css">')
     }


     $(e.target).siblings().removeClass("preivew_disable")

});
