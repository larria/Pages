var Pages=function(){var e={_id:function(e){return document.getElementById(e)},_class:function(e,t,a){var s,n,i,r,o,l=[];if(t===null){t=document}if(a===null){a="*"}if(typeof t.getElementsByClassName==="function"){return t.getElementsByClassName(e)}s=t.getElementsByTagName(a);n=s.length;i=new RegExp("(^|\\s)"+e+"(\\s|$)");for(r=0,o=0;r<n;r++){if(i.test(s[r].className)){l[o]=s[r];o++}}return l},extend:function(e,t){var a;e=e||{};for(a in t){e[a]=t[a]}return e}};var t=function(t){this.conf=this._initConf(t);this.wrap=typeof this.conf.wrap==="string"?e._id(this.conf.wrap):this.conf.wrap;this.status={};this._render(this.conf);this.conf.onPGReady.call(this,this.status)};t.prototype={_initConf:function(t){var a={wrap:"pages-w",total:12,maxShow:999,onIndex:1,onPGReady:function(e){},onEachPage:function(e){}};return e.extend(a,t)},_render:function(t){var a,s,n,i,r,o,l,c,u,d,f,h,p;a=this.status;s=this.wrap;s.innerHTML="";n=s.appendChild(document.createElement("DIV"));i=n.appendChild(document.createElement("A"));r=n.appendChild(document.createElement("A"));n.className="pages-w";i.className="pages-lt";r.className="pages-rt";o=n.insertBefore(document.createElement("A"),i);l=n.appendChild(document.createElement("A"));o.className="pages-llt";l.className="pages-rrt";c={};u=t.onIndex;d=t.total;f=t.maxShow;c=this._createPagesInfo(u,d,f);for(h=c.minPageNo;h<=c.maxPageNo;h++){p=h===u?true:false;n.insertBefore(this._creatAPage(h,p),r)}if(d===1){i.style.display=o.style.display=r.style.display=l.style.display="none"}else if(u===d){r.style.display=l.style.display="none"}else if(u===1){i.style.display=o.style.display="none"}a={from:t.from,onIndex:t.onIndex,total:t.total,maxShow:t.maxShow,enabled:true};this.status=e.extend(a,c);this._initEvents()},_initEvents:function(){var e=this,t=this.wrap;if(t.onclick)return;t.onclick=function(t){var a=t||window.event,s=a.target||a.srcElement,n,i;if(s.tagName!=="A")return;n=s.className;switch(n){case"pages-lt":e.gotoPage(parseInt(e.status.onIndex,10)-1);break;case"pages-rt":e.gotoPage(parseInt(e.status.onIndex,10)+1);break;case"pages-llt":if(e.status.onIndex!==1){e.gotoPage(1)}break;case"pages-rrt":e.gotoPage(e.status.total);break;case"page-cur":return;case"":i=parseInt(s.innerHTML,10);e.gotoPage(i);break;default:throw new Error("Sth wrong in page selecting!")}}},_createPagesInfo:function(e,t,a){var s,n,i,r,o,l={minPageNo:1,maxPageNo:a};if(t<a){l={minPageNo:1,maxPageNo:t}}else{n=parseInt(a/2,10);s=a-n-1;if(e>a){i=Math.min(s,t-e);r=a-i-1;o=e-r}else{if(e+n>=t){i=t-e;r=a-i-1;o=e-r}else{r=Math.min(s,e-1);i=a-r-1;o=e-r}}l={minPageNo:o,maxPageNo:o+a-1}}return l},_creatAPage:function(e,t){var a=this.wrap,s=a.getElementsByTagName("DIV")[0],n=s.appendChild(document.createElement("A"));t&&(n.className="page-cur");n.appendChild(document.createTextNode(e.toString()));return n},_setArrows:function(t,a){var s,n,i,r,o;s=t?"pages-lt":"pages-rt";n=this.wrap;i=e._class(s,n,"A")[0];r=t?"pages-llt":"pages-rrt";o=e._class(r,n,"A")[0];i.style.display=a?"":"none";o.style.display=a?"":"none"},gotoPage:function(e){var t;if(!this.status.enabled)return;if(e===this.status.onIndex)return;t={from:this.status.onIndex,onIndex:e,total:this.conf.total,maxShow:this.conf.maxShow};this._render(t);this.conf.onEachPage(this.status)},addPages:function(e,t){var a=this.conf;if(!this.status.enabled)return;a.total=this.status.total;a.total+=e;a.onIndex=this.status.onIndex;this._render(a);t&&t.call(this,this.status)},enable:function(e){if(typeof e!=="boolean")return;var t=this.wrap;if(e){if(this.status.enabled)return;t.className=t.className.replace(" pages-disable","");this._initEvents();this.status.enabled=true}else{if(!this.status.enabled)return;t.className+=" pages-disable";t.onclick=null;this.status.enabled=false}},destructor:function(){this.wrap.onclick=null;this.wrap.innerHTML="";this.status=null}};return t}();