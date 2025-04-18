# Echogarden

Echogarden is an easy-to-use speech toolset that includes a variety of speech processing tools.

* Easy to install, run, and update
* Written in TypeScript, for the Node.js runtime
* Can be used either as a command-line utility, or imported as a standard `npm` package
* Runs on Windows (x64, ARM64), macOS (x64, ARM64) and Linux (x64, ARM64)
* Doesn't require Python, Docker, or other system-level dependencies
* Doesn't rely on essential platform-specific binaries. Engines are either written in pure TypeScript, ported via WebAssembly, or imported using the [ONNX runtime](https://onnxruntime.ai/)
* Fully open-source (GPL v3)

## Features

* **Text-to-speech** using high-quality [Kokoro](https://github.com/hexgrad/kokoro) and [VITS](https://github.com/jaywalnut310/vits) offline models for many languages and dialects, and [16 other offline and online engines](docs/Engines.md), including cloud services by [Google](https://cloud.google.com/text-to-speech), [Microsoft](https://azure.microsoft.com/en-us/products/ai-services/text-to-speech/), [Amazon](https://aws.amazon.com/polly/), [OpenAI](https://platform.openai.com/) and [ElevenLabs](https://elevenlabs.io/)
* **Speech-to-text** using a custom TypeScript/ONNX port of the [OpenAI Whisper](https://openai.com/research/whisper) speech recognition architecture, [whisper.cpp](https://github.com/ggerganov/whisper.cpp), and [several other engines](docs/Engines.md), including cloud services by [Google](https://cloud.google.com/speech-to-text), [Microsoft](https://azure.microsoft.com/en-us/products/ai-services/speech-to-text/), [Amazon](https://aws.amazon.com/transcribe/) and [OpenAI](https://platform.openai.com/)
* **Speech-to-transcript alignment** using several variants of [dynamic time warping](https://en.wikipedia.org/wiki/Dynamic_time_warping) (DTW, DTW-RA), including support for multi-pass (hierarchical) processing, or via guided decoding using Whisper recognition models. Supports 100+ languages
* **Speech-to-text translation**, translates speech in any of the [98 languages](https://platform.openai.com/docs/guides/speech-to-text/supported-languages) supported by Whisper, to English, with near word-level timing for the translated transcript
* **Speech-to-translated-transcript alignment** synchronizes spoken audio in one language, to a provided English-translated transcript, using the Whisper engine
* **Speech-to-transcript-and-translation alignment** synchronizes spoken audio in one language, to a translation in a variety of other languages, given both a transcript and its translation
* **Text-to-text translation**, translates text between various languages. Supports cloud-based Google Translate engine
* **Language detection** identifies the language of a given audio or text. Includes Whisper or [Silero](https://github.com/snakers4/silero-vad/wiki/Other-Models) engines for spoken audio, and [TinyLD](https://www.npmjs.com/package/tinyld) or [FastText](https://github.com/facebookresearch/fastText) for text
* **Voice activity detection** attempts to identify segments of audio where voice is active or inactive. Includes [WebRTC VAD](https://github.com/dpirch/libfvad), [Silero VAD](https://github.com/snakers4/silero-vad), [RNNoise-based VAD](https://github.com/xiph/rnnoise) and a built-in Adaptive Gate algorithm
* **Speech denoising** attenuates background noise from spoken audio. Includes the [RNNoise](https://github.com/xiph/rnnoise) and [NSNet2](https://github.com/NeonGeckoCom/nsnet2-denoiser) engines
* **Source separation** isolates voice from any music or background ambience. Includes the [MDX-NET](https://github.com/kuielab/mdx-net) deep learning architecture
* **Word-level timestamps** for all recognition, synthesis, alignment and translation outputs
* Advanced **subtitle generation**, accounting for sentence and phrase boundaries
* For the Kokoro, VITS and eSpeak-NG synthesis engines, includes **enhancements to improve TTS pronunciation accuracy**: adds text normalization (e.g. idiomatic date and currency pronunciation), English heteronym disambiguation (based on a simple rule-based model), various pronunciation corrections, and accepts user-provided pronunciation lexicons
* **Internal package system** that auto-downloads and installs voices, models and other resources, as needed

## Installation

Ensure you have [Node.js](https://nodejs.org/) `v18` or later installed (`v22` or later is recommended).

then:
```bash
npm install -g echogarden@latest
```

## Update

Simple, but may not always update to the very latest major version:
```
npm update -g echogarden
```

You can also use [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates) to check for a newer version:
```bash
npm install -g npm-check-updates
ncu -g echogarden
```
Then, if an updated version is available, use the command line `ncu` provides to make the update.

## Using the command-line interface

A small sample of command lines:
```bash
echogarden speak "Hello World!"
echogarden speak-file story.txt --engine=kokoro
echogarden transcribe speech.mp3
echogarden translate-speech speech.webm subtitles.srt
echogarden align speech.opus transcript.txt
echogarden isolate speech.wav
```

See the [command-line interface guide](docs/CLI.md) for more details on the operations supported, and the [configuration options reference](docs/Options.md) for a comprehensive list of all options supported.

## Using the Node.js API

If you are a developer, you can also [directly import the package as a dependency](docs/API.md) in your code. The API operations and options closely mirror the CLI.

## Documentation and guides

* [Quick guide to the command-line interface](docs/CLI.md)
* [Options reference](docs/Options.md)
* [Full list of all available engines](docs/Engines.md)
* [Node.js API reference](docs/API.md)
* [Enabling the CUDA ONNX execution provider](docs/CUDA.md)
* [Technical overview and Q&A](docs/Technical.md)
* [How to help](docs/Contributing.md)
* [Setting up a development environment](docs/Development.md)
* [Developer's task list](docs/Tasklist.md)
* [Release notes (for releases up to `1.0.0`)](docs/Releases.md)

## Credits

This project consolidates, and builds upon the effort of many different individuals and companies, as well as contributing a number of original works.

Developed by Rotem Dan (IPA: /ˈʁɒːtem ˈdän/).

## License

GNU General Public License v3

Licenses for components, models and other dependencies are detailed on [this page](docs/Licenses.md).
