function Moon (opts) {
  var _el = opts.el;
  var _start = opts.start || '{{';
  var _end = opts.end || '}}';
  var _data = opts.data;

  this.el = document.querySelector(_el);
  this.data = _data;
  this.html = this.el.innerHTML;

  this.build = function () {
    var generate = this.html;
    for (let key in this.data) {
      let pattern = _start + key + _end;
      generate = generate.replace(new RegExp(pattern, 'gi'), this.data[key]);
    }
    this.el.innerHTML = generate;
  }

  this.getProxyModel = function () {
    // const obj = {};
    for (let key in this.data) {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get: function () {
          return this.data[key];
        },
        set: function (newVal) {
          this.data[key] = newVal;
          this.build();
        }
      });
    }
    // return obj;
  }

  this.getProxyModel();
  
  this.build();
}
window.Moon = Moon;