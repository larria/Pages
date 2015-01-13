var Pages=function(t){var e={_id:function(t){var e=[];for(var a=0;a<arguments.length;a++){var s=arguments[a];if(typeof s=="string")s=document.getElementById(s);if(arguments.length==1)return s;e.push(s)}return e},_class:function(t,e,a){var s=[];if(e==null)e=document;if(a==null)a="*";if(typeof e.getElementsByClassName=="function"){return e.getElementsByClassName(t)}var n=e.getElementsByTagName(a);var r=n.length;var o=new RegExp("(^|\\s)"+t+"(\\s|$)");for(i=0,j=0;i<r;i++){if(o.test(n[i].className)){s[j]=n[i];j++}}return s},extend:function(t,e){t=t||{};for(var a in e){t[a]=e[a]}return t}};var a=function(t){this.conf=this._initConf(t);this.wrap=typeof this.conf.wrap==="string"?e._id(this.conf.wrap):this.conf.wrap;this.status={};this._render(this.conf);this.conf.onPGReady.call(this,this.status)};a.prototype={_initConf:function(t){var a={wrap:"pages-w",total:12,maxShow:999,onIndex:1,onPGReady:function(t){},onEachPage:function(t){}};return e.extend(a,t)},_render:function(t){var a=this.status,s=this.wrap;s.innerHTML="";var n=s.appendChild(document.createElement("DIV")),r=n.appendChild(document.createElement("A")),i=n.appendChild(document.createElement("A")),o,l;n.className="pages-w";r.className="pages-lt";i.className="pages-rt";o=n.insertBefore(document.createElement("A"),r);l=n.appendChild(document.createElement("A"));o.className="pages-llt";l.className="pages-rrt";var c={},u=t.onIndex;total=t.total,maxShow=t.maxShow;c=this._createPagesInfo(u,total,maxShow);for(var d=c.minPageNo;d<=c.maxPageNo;d++){var h=d==u?true:false;n.insertBefore(this._creatAPage(d,h),i)}if(total==1){r.style.display=o.style.display=i.style.display=l.style.display="none"}else if(u==total){i.style.display=l.style.display="none"}else if(u==1){r.style.display=o.style.display="none"}a={from:t.from,onIndex:t.onIndex,total:t.total,maxShow:t.maxShow,enabled:true};this.status=e.extend(a,c);this._initEvents()},_initEvents:function(){var t=this,e=this.wrap;if(e.onclick){return}e.onclick=function(e){var e=e||window.event,a=e.target||e.srcElement,s;if(a.tagName!="A")return;s=a.className;switch(s){case"pages-lt":t.gotoPage(parseInt(t.status.onIndex)-1);break;case"pages-rt":t.gotoPage(parseInt(t.status.onIndex)+1);break;case"pages-llt":if(t.status.onIndex!=1)t.gotoPage(1);break;case"pages-rrt":t.gotoPage(t.status.total);break;case"page-cur":return;case"":var n=parseInt(a.innerHTML);t.gotoPage(n);break;default:alert("错误的事件指向!")}}},_createPagesInfo:function(t,e,a){var s={minPageNo:1,maxPageNo:a};if(e<a){s={minPageNo:1,maxPageNo:e}}else{var n=parseInt(a/2),r=a-n-1,i,o,l;if(t>a){i=Math.min(r,e-t),o=a-i-1;l=t-o}else{if(t+n>=e){i=e-t;o=a-i-1;l=t-o}else{o=Math.min(r,t-1),i=a-o-1;l=t-o}}s={minPageNo:l,maxPageNo:l+a-1}}return s},_creatAPage:function(t,e){var a=this.wrap,s=a.getElementsByTagName("DIV")[0],n=s.appendChild(document.createElement("A"));if(e)n.className="page-cur";n.appendChild(document.createTextNode(t.toString()));return n},_setArrows:function(t,a){var s=t?"pages-lt":"pages-rt",n=this.wrap,r=e._class(s,n,"A")[0],i=t?"pages-llt":"pages-rrt",o=e._class(i,n,"A")[0];r.style.display=a?"":"none";o.style.display=a?"":"none"},gotoPage:function(t){if(!this.status.enabled)return;if(t==this.status.onIndex)return;var e={from:this.status.onIndex,onIndex:t,total:this.conf.total,maxShow:this.conf.maxShow};this._render(e);this.conf.onEachPage(this.status)},addPages:function(t,e){if(!this.status.enabled)return;var a=this.conf;a.total=this.status.total;a.total+=t;a.onIndex=this.status.onIndex;this._render(a);e&&e.call(this,this.status)},enable:function(t){if(typeof t!=="boolean")return;var e=this.wrap;if(t){if(this.status.enabled)return;var a={total:this.status.total,maxShow:this.status.maxShow,onIndex:this.status.onIndex};e.className=e.className.replace(" pages-disable","");this._initEvents();this.status.enabled=true}else{if(!this.status.enabled)return;e.className+=" pages-disable";e.onclick=null;this.status.enabled=false}},destructor:function(){var t=this.wrap;t.onclick=null;t.innerHTML="";t.parentNode.removeChild(t);this.status=null}};return a}();