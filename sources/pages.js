/*
 * 分页组件.
 * Copyright (c) 2011, Sina. All rights reserved.
 * Licensed under XXXXX (http://url_of_the_license).
 * Version: 1.2
 * @author 钟远 Yuan Zhong  <a href="mailto:zhongyuan2@staff.sina.com.cn">zhongyuan2@staff.sina.com.cn</a>
 */

// update in 12.9, 2014
// 注意：v1.2无法向下兼容

var Pages = function(opts) {
	var fn = {
		_id: function(id) {
			var elements = [];
			for (var i = 0; i < arguments.length; i++) {
				var element = arguments[i];
				if (typeof element == 'string')
					element = document.getElementById(element);
				if (arguments.length == 1)
					return element;
				elements.push(element);
			}
			return elements;
		},
		_class: function(searchClass, node, tag) {
			var classElements = [];
			if (node == null)
				node = document;
			if (tag == null)
				tag = '*';
			if (typeof node.getElementsByClassName == 'function'){
				return node.getElementsByClassName(searchClass);
			}
			var els = node.getElementsByTagName(tag);
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
			for (i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++;
				}
			}
			return classElements;
		},
		extend: function(o, t) {
			o = o || {};
			for (var sName in t) {
				o[sName] = t[sName];
			}
			return o;
		}
	};
	var init = function(opts) {
		this.conf = this._initConf(opts);
		this.wrap = typeof this.conf.wrap === 'string' ? fn._id(this.conf.wrap) : this.conf.wrap;
		this.status = {};
		this._render(this.conf);
		this.conf.onPGReady.call(this, this.status);
	};
	init.prototype = {
		_initConf: function(c) {
			var conf = {
				wrap: 'pages-w',
				total: 12,
				maxShow: 999,
				onIndex: 1,
				onPGReady: function(s) {},
				onEachPage: function(i) {}
			};
			return fn.extend(conf, c);
		},
		_render: function(c) {
			var status = this.status,
				wrap =  this.wrap;
			wrap.innerHTML = '';
			var pagesW = wrap.appendChild(document.createElement('DIV')),
				pagesLt = pagesW.appendChild(document.createElement('A')),
				pagesRt = pagesW.appendChild(document.createElement('A')),
				pagesLlt,
				pagesRrt;
			pagesW.className = 'pages-w';
			pagesLt.className = 'pages-lt';
			pagesRt.className = 'pages-rt';
			pagesLlt = pagesW.insertBefore(document.createElement('A'), pagesLt);
			pagesRrt = pagesW.appendChild(document.createElement('A'));
			pagesLlt.className = 'pages-llt';
			pagesRrt.className = 'pages-rrt';
			var pagesInfo = {},
				onIndex = c.onIndex
			total = c.total,
				maxShow = c.maxShow;
			pagesInfo = this._createPagesInfo(onIndex, total, maxShow);
			for (var i = pagesInfo.minPageNo; i <= pagesInfo.maxPageNo; i++) {
				var isOn = (i == onIndex ? true : false);
				pagesW.insertBefore(this._creatAPage(i, isOn), pagesRt);
			}
			if (total == 1){
				pagesLt.style.display = pagesLlt.style.display = pagesRt.style.display = pagesRrt.style.display = 'none';
			}
			else if (onIndex == total) {
				pagesRt.style.display = pagesRrt.style.display = 'none';
			} else if (onIndex == 1) {
				pagesLt.style.display = pagesLlt.style.display = 'none';
			}
			status = {
				from : c.from,
				onIndex : c.onIndex,
				total : c.total,
				maxShow : c.maxShow,
				enabled : true
			};
			this.status = fn.extend(status, pagesInfo);
			this._initEvents();
		},
		_initEvents: function() {
			var that = this,
				wrap = this.wrap;
			if(wrap.onclick) { return }
			wrap.onclick = function(e) {
				var e = e || window.event,
					target = e.target || e.srcElement,
					tClzN;
				if (target.tagName != 'A') return;
				tClzN = target.className;
				switch (tClzN) {
					case 'pages-lt':
						that.gotoPage(parseInt(that.status.onIndex) - 1);
						break;
					case 'pages-rt':
						that.gotoPage(parseInt(that.status.onIndex) + 1);
						break;
					case 'pages-llt':
						if (that.status.onIndex != 1)
							that.gotoPage(1);
						break;
					case 'pages-rrt':
						that.gotoPage(that.status.total);
						break;
					case 'page-cur':
						return;
					case '':
						var index = parseInt(target.innerHTML);
						that.gotoPage(index);
						break;
					default:
						alert('错误的事件指向!');
				}
			};
		},
		_createPagesInfo: function(onNumber, total, maxShow) {
			var result = {
				minPageNo: 1,
				maxPageNo: maxShow
			};
			if (total < maxShow) {
				result = {
					minPageNo: 1,
					maxPageNo: total
				};
			} else {
				var halfB = parseInt(maxShow / 2),
					halfA = maxShow - halfB - 1,
					sumOfRight, sumOfLeft, fromPageIndex;
				if (onNumber > maxShow) {
					sumOfRight = Math.min(halfA, total - onNumber),
						sumOfLeft = maxShow - sumOfRight - 1;
					fromPageIndex = onNumber - sumOfLeft;
				} else {
					//not enough items on right side
					if (onNumber + halfB >= total) {
						sumOfRight = total - onNumber;
						sumOfLeft = maxShow - sumOfRight - 1;
						fromPageIndex = onNumber - sumOfLeft;
						//if got enough items on right side, put the onNumber in the middle position of the list
					} else {
						sumOfLeft = Math.min(halfA, onNumber - 1),
							sumOfRight = maxShow - sumOfLeft - 1;
						fromPageIndex = onNumber - sumOfLeft;
					}
				}
				result = {
					minPageNo: fromPageIndex,
					maxPageNo: fromPageIndex + maxShow - 1
				};
			}
			return result;
		},
		_creatAPage: function(index, isOn) {
			var wrap = this.wrap,
				pagesW = wrap.getElementsByTagName('DIV')[0],
				aPage = pagesW.appendChild(document.createElement('A'));
			if (isOn)
				aPage.className = 'page-cur';
			aPage.appendChild(document.createTextNode(index.toString()));
			return aPage;
		},
		_setArrows: function(isLeft, isShow) {
			var arrowClass = isLeft ? 'pages-lt' : 'pages-rt',
				wrap = this.wrap,
				arrow = fn._class(arrowClass, wrap, 'A')[0],
				exArrClass = isLeft ? 'pages-llt' : 'pages-rrt',
				exArrow = fn._class(exArrClass, wrap, 'A')[0];

			arrow.style.display = isShow ? '' : 'none';
			exArrow.style.display = isShow ? '' : 'none';
		},
		//以下为公有方法
		//跳转页面(para：Number__跳转页数)
		gotoPage: function(toPageNo) {
			if (!this.status.enabled) return;
			if (toPageNo == this.status.onIndex) return;
			var conf = {
				from : this.status.onIndex,
				onIndex: toPageNo,
				total: this.conf.total,
				maxShow: this.conf.maxShow
			};
			this._render(conf);
			this.conf.onEachPage(this.status);
		},
		//手动添加页数(para：Number__添加页数, [Function__回调函数,默认将更新后的组件信息对象作为第一个参数传入])
		addPages: function(num, onAddDone) {
			if (!this.status.enabled) return;
			var conf = this.conf;
			conf.total = this.status.total
			conf.total += num;
			conf.onIndex = this.status.onIndex;
			this._render(conf);
			onAddDone && onAddDone.call(this, this.status);
		},
		//切换启用/禁用组件(para：Boolean__是否启用组件,true为启用)
		enable: function(isEnable) {
			if (typeof isEnable !== 'boolean') return;
			var wrap = this.wrap;
			if (isEnable) {
				if (this.status.enabled) return;
				var c = {
					total: this.status.total,
					maxShow: this.status.maxShow,
					onIndex: this.status.onIndex
				};
				wrap.className = wrap.className.replace(' pages-disable', '');
				this._initEvents();
				this.status.enabled = true;
			} else {
				if (!this.status.enabled) return;
				wrap.className += ' pages-disable';
				wrap.onclick = null;
				this.status.enabled = false;
			}
		},
		//组件析构
		destructor: function() {
			var wrap = this.wrap;
			wrap.onclick = null;
			wrap.innerHTML = '';
			wrap.parentNode.removeChild(wrap);
			this.status = null;
		}
	};
	return init;
}();