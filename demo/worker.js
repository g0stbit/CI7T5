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
        const pipe = await pipeline('text2text-generation', model, { dtype: 'auto' });
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
        const result = await loadedModels[model](data, {
         // max_length: 80, // Maximum length of the generated text
          "early_stopping": true,
          "length_penalty": 2.0,
          "max_length": 200,
          "min_length": 30,
          "no_repeat_ngram_size": 3,
          "num_beams": 4,
          do_sample: true, // Whether to use sampling (for more creative outputs)
          temperature: 0.7, // Controls the randomness of the output*/
          ...options
        });
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