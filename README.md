# LaMini-Flan-T5 Inference Demo

> **A lightweight, fast text-to-text model running entirely in your browser.**

This demo lets you interact with small language models like **LaMini-Flan-T5** directly in your browser — no server or internet connection required after loading. These models are optimized for quick inference on everyday tasks like summarizing, translating, and rewriting text.

👉 [Live Demo](https://g0stbit.github.io/CI7T5/demo ) \
📘 [Document](https://g0stbit.github.io/CI7T5/)\
📦 [GitHub Repo](https://github.com/g0stbit/CI7T5)

---

## ✅ Features


- ✅ **Runs fully client-side**\
  All computation happens in-browser — no server required.

- ✅ **No backend or API needed**\
  Everything runs locally using JavaScript and Web Workers.

- ⚠️ **Works offline after initial load** *(planned feature)*\
  Once models are cached, the app will work without internet access.

- ✅ **Load models from Hugging Face Hub**\
  You're not limited to predefined models — try any compatible model by entering its Hugging Face repository ID or URL.

- ✅ **Supports multiple compact T5 variants**\
  Choose between:\
  - `LaMini-Flan-T5-77M` (~77 million parameters)
  - `LaMini-Flan-T5-248M` (~248 million parameters)

- ✅ **Run multiple models independently**\
  Load, use, and unload different models without interfering with each other.

- ✅ **Uses efficient WASM execution**\
  Powered by **Hugging Face `transformers.js`**, this tool uses **WebAssembly (WASM)** for fast inference in the browser.

- 🚀 **WebGPU acceleration (coming soon)**\
  Future support for GPU-powered inference via **WebGPU** will significantly speed up performance when available in browsers.

- ✅ **Supports custom text-to-text tasks**\
  From summarization and translation to grammar fixing and paraphrasing — just provide an instruction and content.

- ✅ **Example prompts included**\
  Get started quickly with built-in examples for common use cases like Q&A, classification, and more.

---

## 📋 How to Use This Tool

1. **Load a Model**
   Choose a model from the dropdown and click **"Load Model"**. This may take a few seconds.

2. **Enter Your Request**
   You can either:
   - Select an example from the dropdown, or
   - Type your own instruction (e.g., `"summarize:"`, `"translate to Spanish:"`) and provide content below it.

3. **Generate Output**
   Click the **"Generate"** button and wait for the model to return a result.

---

## 🔗 Links

- 🌐 [Live Demo](https://g0stbit.github.io/CI7T5/demo)
- 📄 [Document](https://g0stbit.github.io/CI7T5/)
- 📂 [GitHub Repo](https://github.com/g0stbit/CI7T5)
- 🤖 [LaMini-LM](https://github.com/mbzuai-nlp/lamini-lm )

---

## 💡 What Can This Model Do?

This model is capable of handling a variety of simple **text-to-text** tasks. Here are some examples of what you can try:

| Task | Instruction Format | Example Input |
|------|--------------------|----------------|
| Summarize | `Summarize:` | "The quick brown fox..." |
| Q&A | `Q&A:` | "What is the capital of France?" |
| Simplify | `Simplify:` | "Utilizing an innovative methodology..." |
| Translate | `Translate to Spanish:` | "Hello, how are you today?" |
| Paraphrase | `Paraphrase:` | "It is important to maintain good hygiene..." |
| Grammar Fix | `Correct grammar:` | "She don't like apples very much." |
| Sentiment Analysis | `Analyze sentiment:` | "I really love this product!" |
| Generate Question | `Generate question:` | "Marie Curie was a physicist..." |
| Fill in the Blank | `Fill in the blank:` | "The sun rises in the ____." |
| Classification | `Classify as positive or negative:` | "The movie was boring and too long." |
| Tweet Rewriting | `Rewrite as a tweet` | "Our team just launched a brand-new feature..." |
| Keyword Extraction | `Extract keywords:` | "Artificial intelligence is transforming industries..." |
| Explain Like I'm Five | `Explain like I'm five:` | "How does the internet work?" |

---

## 🛠️ Technologies Used

- JavaScript
- HTML5
- Web Workers
- jQuery
- [Hugging Face / transformers.js](https://huggingface.co/docs/transformers.js/index ) – for running Hugging Face models directly in-browser
- [lamini-lm](https://github.com/mbzuai-nlp/lamini-lm ) – a lightweight, fast language model optimized for client-side use

---

## 📌 Notes

- This project is currently **online-only**, but full offline support is planned.
- All processing happens **in-browser** – your data never leaves your device.

---

> 💡 **Tip:** You can save this page locally and use it later without internet (except for initial model load).