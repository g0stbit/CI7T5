
  const worker = new Worker("worker.js", { type: "module" });
  let requestIdCounter = 1;

  worker.onmessage = function (e) {
    const response = e.data;
    if (window.CI7T5 && window.CI7T5.handleWorkerMessage) {
      window.CI7T5.handleWorkerMessage(response);
    }
  };

  // T5 CONTROLLER WITH EVENT EMITTER AND MULTI-MODEL SUPPORT
  (function () {
    const events = {};
    window.CI7T5 = {
      loadedModels: {}, // modelName => boolean
      callbacks: {},
      pendingLoads: {}, // modelName => boolean

      on(event, handler) {
        if (!events[event]) events[event] = [];
        events[event].push(handler);
      },

      emit(event, data) {
        if (events[event]) {
          events[event].forEach((handler) => handler(data));
        }
      },

      _getModelName() {
        const selected = $("#modelSelect").val();
        if (selected === "custom") return $("#customModelInput").val().trim();

        const modelMap = {
          "LaMini-Flan-T5-77M": "Xenova/LaMini-Flan-T5-77M",
          "LaMini-Flan-T5-248M": "Xenova/LaMini-Flan-T5-248M"
        };
        return modelMap[selected];
      },

      isLoaded(modelOrUrl) {
        const modelName = modelOrUrl || this._getModelName();
        return !!this.loadedModels[modelName];
      },

      load(modelOrUrl, readyCallback) {
        const modelName = modelOrUrl || this._getModelName();
        if (!modelName) return alert("Please enter a valid model name or URL.");
        if (this.isLoaded(modelName)) return alert("Model already loaded.");

        this.pendingLoads[modelName] = true;
        this._send("load", modelName, null, readyCallback);
      },

      unload(modelOrUrl, callback) {
        const modelName = modelOrUrl || this._getModelName();
        if (!this.isLoaded(modelName)) return alert("Model not loaded.");

        delete this.loadedModels[modelName];
        this._send("unload", modelName, null, callback);
      },

      request(modelOrUrl, message, callback) {
        const modelName = modelOrUrl || this._getModelName();
        if (!this.isLoaded(modelName)) return alert("Model not loaded.");

        this._send("message", modelName, message, callback);
      },

      _send(method, modelName, data, callback) {
        const request_id = requestIdCounter++;
        if (callback) this.callbacks[request_id] = callback;

        worker.postMessage({
          request_id,
          method,
          model: modelName,
          data,
          options: {}
        });
      },

      handleWorkerMessage(response) {
        const cb = this.callbacks[response.request_id];
        if (cb) {
          cb(response);
          delete this.callbacks[response.request_id];
        }

        switch (response.method) {
          case "load":
            this.loadedModels[response.model] = true;
            delete this.pendingLoads[response.model];
            break;
          case "unload":
            delete this.loadedModels[response.model];
            break;
        }

        this.emit("response", response);
        this.emit(response.method, response);
      }
    };
  })();