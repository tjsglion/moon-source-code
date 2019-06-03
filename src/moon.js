(function (win) {
  /**
   * @description 更新页面内容
   * @param {string} start
   * @param {string} end
   * @param {string} key
   * @param {Object} model
   * @param {node} el
   */
  const update = function (start, end, key, value, el) {
    let pattern = start + key + end;
    el.innerHTML = el.innerHTML.replace(new RegExp(pattern, 'g'), value);
  }
  /**
   * @description Moon 构造函数
   * @param {Object} opts
   * @constructor Moon
   */
  function Moon (opts) {
    // 根据传入的el获得对应的节点元素;
    var el = document.querySelector(opts.el),
        model = opts.model,
    // 获取el元素下的所有子节点
        children = el.childNodes,
        start = el.start || '{{',
        end = el.end || '}}';
        console.log(children);

    const getProxyModel = function () {
      let obj = {};
      for (let key in model) {
        if (model.hasOwnProperty(key)) {
          // 双向数据绑定
          Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get: function () {
              return model[key];
            },
            set: function (newVal) {
              if (newVal === model[key]) return;
              model[key] = newVal;
              // 更新页面
              update(start, end, key, model[key], el);
            }
          });
          update(start, end, key, model[key], el);
        }
      }
      return obj;
    }

    model = getProxyModel();

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (child.hasAttribute('m-model')) {
        let modelValue = child.value;
        let modelName = child.getAttribute('m-model');
        model[modelName] = modelValue;
        child.value = model[modelName];
        // 添加事件
        child.addEventListener(['keyup', 'blur'], function (e) {
          const name = e.target.getAttribute('m-model');
          if (name) {
            model[name] = e.target.value;
          }
        });
        // 更新
        // update(start, end, modelName, modelValue, el);
      }
    }
  }

  win.Moon = Moon;
})(window);
