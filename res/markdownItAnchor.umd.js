!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).markdownItAnchor=n()}(this,function(){var e=!1,n={false:"push",true:"unshift",after:"push",before:"unshift"},t={isPermalinkSymbol:!0};function r(r,i,a,l){var o;if(!e){var c="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#todo-anchor-or-file";"object"==typeof process&&process&&process.emitWarning?process.emitWarning(c):console.warn(c),e=!0}var s=[Object.assign(new a.Token("link_open","a",1),{attrs:[].concat(i.permalinkClass?[["class",i.permalinkClass]]:[],[["href",i.permalinkHref(r,a)]],Object.entries(i.permalinkAttrs(r,a)))}),Object.assign(new a.Token("html_block","",0),{content:i.permalinkSymbol,meta:t}),new a.Token("link_close","a",-1)];i.permalinkSpace&&a.tokens[l+1].children[n[i.permalinkBefore]](Object.assign(new a.Token("text","",0),{content:" "})),(o=a.tokens[l+1].children)[n[i.permalinkBefore]].apply(o,s)}function i(e){return"#"+e}function a(e){return{}}var l={class:"header-anchor",symbol:"#",renderHref:i,renderAttrs:a};function o(e){function n(t){return t=Object.assign({},n.defaults,t),function(n,r,i,a){return e(n,t,r,i,a)}}return n.defaults=Object.assign({},l),n.renderPermalinkImpl=e,n}var c=o(function(e,r,i,a,l){var o,c=[Object.assign(new a.Token("link_open","a",1),{attrs:[].concat(r.class?[["class",r.class]]:[],[["href",r.renderHref(e,a)]],r.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(r.renderAttrs(e,a)))}),Object.assign(new a.Token("html_inline","",0),{content:r.symbol,meta:t}),new a.Token("link_close","a",-1)];if(r.space){var s="string"==typeof r.space?r.space:" ";a.tokens[l+1].children[n[r.placement]](Object.assign(new a.Token("string"==typeof r.space?"html_inline":"text","",0),{content:s}))}(o=a.tokens[l+1].children)[n[r.placement]].apply(o,c)});Object.assign(c.defaults,{space:!0,placement:"after",ariaHidden:!1});var s=o(c.renderPermalinkImpl);s.defaults=Object.assign({},c.defaults,{ariaHidden:!0});var f=o(function(e,n,t,r,i){var a=[Object.assign(new r.Token("link_open","a",1),{attrs:[].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,r)]],Object.entries(n.renderAttrs(e,r)))})].concat(n.safariReaderFix?[new r.Token("span_open","span",1)]:[],r.tokens[i+1].children,n.safariReaderFix?[new r.Token("span_close","span",-1)]:[],[new r.Token("link_close","a",-1)]);r.tokens[i+1]=Object.assign(new r.Token("inline","",0),{children:a})});Object.assign(f.defaults,{safariReaderFix:!1});var u=o(function(e,r,i,a,l){var o;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(r.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+r.style+"`");if(!["aria-describedby","aria-labelledby"].includes(r.style)&&!r.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+r.style+"` style");if("visually-hidden"===r.style&&!r.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var c=a.tokens[l+1].children.filter(function(e){return"text"===e.type||"code_inline"===e.type}).reduce(function(e,n){return e+n.content},""),s=[],f=[];if(r.class&&f.push(["class",r.class]),f.push(["href",r.renderHref(e,a)]),f.push.apply(f,Object.entries(r.renderAttrs(e,a))),"visually-hidden"===r.style){if(s.push(Object.assign(new a.Token("span_open","span",1),{attrs:[["class",r.visuallyHiddenClass]]}),Object.assign(new a.Token("text","",0),{content:r.assistiveText(c)}),new a.Token("span_close","span",-1)),r.space){var u="string"==typeof r.space?r.space:" ";s[n[r.placement]](Object.assign(new a.Token("string"==typeof r.space?"html_inline":"text","",0),{content:u}))}s[n[r.placement]](Object.assign(new a.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new a.Token("html_inline","",0),{content:r.symbol,meta:t}),new a.Token("span_close","span",-1))}else s.push(Object.assign(new a.Token("html_inline","",0),{content:r.symbol,meta:t}));"aria-label"===r.style?f.push(["aria-label",r.assistiveText(c)]):["aria-describedby","aria-labelledby"].includes(r.style)&&f.push([r.style,e]);var d=[Object.assign(new a.Token("link_open","a",1),{attrs:f})].concat(s,[new a.Token("link_close","a",-1)]);(o=a.tokens).splice.apply(o,[l+3,0].concat(d)),r.wrapper&&(a.tokens.splice(l,0,Object.assign(new a.Token("html_block","",0),{content:r.wrapper[0]+"\n"})),a.tokens.splice(l+3+d.length+1,0,Object.assign(new a.Token("html_block","",0),{content:r.wrapper[1]+"\n"})))});function d(e,n,t,r){var i=e,a=r;if(t&&Object.prototype.hasOwnProperty.call(n,i))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,i);)i=e+"-"+a,a+=1;return n[i]=!0,i}function p(e,n){n=Object.assign({},p.defaults,n),e.core.ruler.push("anchor",function(e){for(var t,i={},a=e.tokens,l=Array.isArray(n.level)?(t=n.level,function(e){return t.includes(e)}):function(e){return function(n){return n>=e}}(n.level),o=0;o<a.length;o++){var c=a[o];if("heading_open"===c.type&&l(Number(c.tag.substr(1)))){var s=n.getTokensText(a[o+1].children),f=c.attrGet("id");f=null==f?d(n.slugify(s),i,!1,n.uniqueSlugStartIndex):d(f,i,!0,n.uniqueSlugStartIndex),c.attrSet("id",f),!1!==n.tabIndex&&c.attrSet("tabindex",""+n.tabIndex),"function"==typeof n.permalink?n.permalink(f,n,e,o):(n.permalink||n.renderPermalink&&n.renderPermalink!==r)&&n.renderPermalink(f,n,e,o),o=a.indexOf(c),n.callback&&n.callback(c,{slug:f,title:s})}}})}return Object.assign(u.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),p.permalink={__proto__:null,legacy:r,renderHref:i,renderAttrs:a,makePermalink:o,linkInsideHeader:c,ariaHidden:s,headerLink:f,linkAfterHeader:u},p.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(e){return["text","code_inline"].includes(e.type)}).map(function(e){return e.content}).join("")},permalink:!1,renderPermalink:r,permalinkClass:s.defaults.class,permalinkSpace:s.defaults.space,permalinkSymbol:"¶",permalinkBefore:"before"===s.defaults.placement,permalinkHref:s.defaults.renderHref,permalinkAttrs:s.defaults.renderAttrs},p.default=p,p});
