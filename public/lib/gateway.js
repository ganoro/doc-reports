(function(global) {
	var EventEmitter = function() {
		this.listeners = {};
		
	};
	
	/**
	 * 
	 */
	EventEmitter.prototype.on = function(eventName, callback) {
		if (typeof callback !== 'function') {
			throw 'on(eventName, callback): callback must be function: '+callback;
		}
		if (this.listeners[eventName] == null) {
			this.listeners[eventName] = [callback];
		} else {
			this.listeners[eventName].push(callback);
		}
	};
	
	/**
	 * 
	 */
	EventEmitter.prototype.fire = function(eventName, data) {
		var thislisteners = this.listeners[eventName];
		if (thislisteners == null) {
			return;
		};
		
		var k;
		for (k in thislisteners) {
			thislisteners[k](data);
		}
	};
	
	/** Gateful SDK API
	 * @constructor Gateful
	 * 
	 */
	var Gateful = function() {
		this.listeners = new EventEmitter();
	};
	
	/**
	 * Initialize Gateful SDK.
	 * Sample options:
	 * <code>
	 * 	 {<br/>
	 * 		url : 'www.myapiservice.com' // REQUIRED<br/>
	 *   }</br>
	 * </code>
	 * @param opts Options 
	 */
	Gateful.prototype.init = function(opts) {
		if ((opts === undefined) || (opts.url === undefined)) {
			throw "Gateful.init: opts.url must be set";
		}
		this.baseUrl = opts.url;
		this.opts = opts || {};
	}
	
	/**
	 * Add an event listener.
	 * @param event Name of event to be notified about.
	 * @param callback Function to be called to handle event.
	 */
	Gateful.prototype.on = function(event, callback) {
		this.listeners.on(event, callback);
	};
		
	/**
	 * Send an API request.
	 * Additional data to the request has following structure: 
	 * <code>
	 * {<br/>
	 * 	params : { 'key1' : 'value1', 'key2' : 'value2' },<br/>
	 *  method : 'GET',</br>
	 * }<br/>
	 * </code>
	 * 
	 * @param url API method URL.
	 * @param data API request additional paramters.
	 * @param callback Function to be called to handle API response.
	 * @param errorCallback Function to be called to handle API failure.
	 */
	Gateful.prototype.api = function(url, data, callback, errorCallback) {
		if (typeof data === 'function') {
			errorCallback = callback;
			callback = data;
			data = {};
		}
		
		this.listeners.fire('get', { url : url, callback : callback });
		
		var request = {
			url : this.baseUrl + url,
			//headers : data.headers || {},
			method : data && data.method || 'GET',
			params : data && data.params,
			doit : true
		};
		
		this.listeners.fire('send', {request : request});
		
		if (request.doit === false) {
			return;
		}
		
		var queryParams = data && data.params;
		
		var that = this;
		jQuery.ajax({
			url : request.url,
			type : request.method,
			data : request.params,
			success : function(data, status, xhr) {
				var response = undefined;
				try {
					var json = jQuery.parseJSON(data);
					if (json.result) {
						response = json.result;						
					} else {
						response = json;
					}
				} catch (ex) { // parse failed
					//
				}
				
				that.listeners.fire('receive', { request : request, response : response, data : data });
				callback(request, response, data);
			},
			error : function(data) {
				that.listeners.fire('error', { error : data, request : request });
				if (errorCallback != null) {
					errorCallback({ error : data, request : request });
				}
			},
			complete: function() {
				that.listeners.fire('complete', {});
			}
		});
	};
	
	global.Gateful = new Gateful();
})(this);
