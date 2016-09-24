var verification = function() {
	this.id = "";
	// 	this.boxMessage="";
};
verification.prototype = {
	_getId: function(id) {
		this.id = document.getElementById(id);
	},
	verModalBox: function(boxMessage) {
		var verModalBoxP = document.createElement("p");
		verModalBoxP.innerHTML = boxMessage;
		var verModalBoxSpan = document.createElement("span");
		verModalBoxSpan.innerHTML = "确定"
		var verModalBoxDiv = document.createElement("div");
		verModalBoxDiv.className = "verModalBox";
		verModalBoxDiv.appendChild(verModalBoxP);
		verModalBoxDiv.appendChild(verModalBoxSpan);
		var verModalDiv = document.createElement("div");
		verModalDiv.className = "verModal";
		verModalDiv.appendChild(verModalBoxDiv);
		document.getElementsByTagName("body")[0].appendChild(verModalDiv);
		document.getElementsByTagName("body")[0].setAttribute("style", "overflow: hidden;height: 100%;")
	},
	verModalBoxClose: function() {
		document.getElementsByTagName("body")[0].removeAttribute("style", "overflow: hidden;height: 100%;");
		document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("verModal")[0]);
	},
	verMarker: function(boxMessage, sort) {
		var vermark = document.getElementsByClassName("verMark")[sort];
		vermark.style.display = "block";
		vermark.innerHTML = boxMessage;
	},
	_verMarkerClose: function(sort) {
		var vermark = document.getElementsByClassName("verMark")[sort];
		vermark.style.display = "none";
	},
	_isVerFn: function(id, boxMessage, sort, regs) {
		this._getId(id);
		var str = this.id.value.replace(/(^\s+)|(\s+$)|(\s)/g, "");
		(sort != undefined || "") && this._verMarkerClose(sort);
		console.log(regs);
		var reg = new RegExp(regs);
		if(!reg.test(str) && str.length != 0) {
			sort != undefined || "" ? this.verMarker(boxMessage, sort) : this.verModalBox(boxMessage);
		};
	},
	letterNum: function(id, boxMessage, sort) {
		this._isVerFn(id, boxMessage, sort, "^[0-9a-zA-Z\s]+$");
	},
	isChina: function(id, boxMessage, sort) {
		this._isVerFn(id, boxMessage, sort, "^[\u4e00-\u9fa5]{2,6}$");
	},
	isIDIdentification: function(id, boxMessage, sort) {
		this._isVerFn(id, boxMessage, sort, "^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$");
	}
};