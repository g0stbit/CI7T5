import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers/+esm';

// Store loaded models
const loadedModels = {};
let statusCallback = null;

self.onmessage = async function(event) {
  const request = event.data;
  const { request_id, method, model, data, options } = request;

  try {
    switch (method) {
      case "load":
        if (loadedModels[model]) {
          respond(request_id, method, "Model already loaded");
          break;
        }
        postMessage({ request_id, method, data: "Loading...", model });
        const pipe = await pipeline('text2text-generation', model);
        loadedModels[model] = pipe;
        respond(request_id, method, "Loaded successfully", model);
        break;

      case "unload":
        delete loadedModels[model];
        respond(request_id, method, "Unloaded", model);
        break;

      case "isLoaded":
        respond(request_id, method, loadedModels[model] ? true : false, model);
        break;

      case "message":
        if (!loadedModels[model]) {
          throw new Error("Model not loaded");
        }
        console.log(data);
        const result = await loadedModels[model](data);
        respond(request_id, method, result[0]?.generated_text || "No output", model);
        break;

      default:
        throw new Error("Unknown method: " + method);
    }
  } catch (error) {
    console.error("Worker error:", error);
    respondError(request_id, method, error.message, model);
  }
};

function respond(id, method, data, model) {
  postMessage({
    request_id: id,
    method,
    model,
    data
  });
}

function respondError(id, method, error, model) {
  postMessage({
    request_id: id,
    method,
    model,
    error
  });
}