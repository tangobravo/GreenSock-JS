/*!
 * VERSION: 0.0.1
 * DATE: 2014-03-31
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push( function() {
	//ignore the line above this and at the very end - those are for ensuring things load in the proper order
	"use strict";

	window._gsDefine.plugin({
		propName: "arrayProps",
		API: 2,
		version: "0.0.1",

		init: function(target, value, tween) {
			this._target = target;
			this._props = [];
			this._vals = {};
			var p, a, e, start, end, i, isFunc;
			for (p in value) {
				isFunc = (typeof(target[p]) === "function");
				this._props.push({p:p, isFunc:isFunc});
				this._vals[p] = a = isFunc ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]()  : target[p];
				e = value[p];
				for (i = 0; i < a.length; i++) {
					start = a[i];
					end = e[i];
					if (start !== end) {
						this._addTween(a, i, start, end, p, false);
					}
				}
			}
			return true;
		},

		set: function(ratio) {
			this._super.setRatio.call(this, ratio);
			var props = this._props,
				i = props.length,
				p;
			while (--i > -1) {
				p = props[i].p;
				if (props[i].isFunc) {
					this._target[p](this._vals[p]);
				} else {
					this._target[p] = this._vals[p];
				}
			}
		}

	});

}); if (window._gsDefine) { window._gsQueue.pop()(); }