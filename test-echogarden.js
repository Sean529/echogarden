// test-echogarden.js
import * as Echogarden from "./dist/api/API.js"
import { writeFileSync, readFileSync } from "fs"
import { join } from "path"

// 设置日志输出
const log = console.log

// 测试文本转语音
async function testSynthesis() {
  log("测试文本转语音...")
  try {
    const result = await Echogarden.synthesize("Hello, world! This is a test.", {
      engine: "espeak", // 使用 espeak 引擎
      language: "en",
      speed: 1.0,
      pitch: 1.0,
    })

    log(`合成完成，语言: ${result.language}, 语音: ${result.voice}`)

    // 保存音频文件
    if (result.audio instanceof Uint8Array) {
      writeFileSync("test-output.wav", result.audio)
      log("音频已保存到 test-output.wav")
    } else {
      log("音频格式不是 Uint8Array，无法保存")
    }

    return result
  } catch (error) {
    log(`文本转语音测试失败: ${error.message}`)
    throw error
  }
}

// 测试语音识别
async function testRecognition(audioPath) {
  log("测试语音识别...")
  try {
    const result = await Echogarden.recognize(audioPath, {
      engine: "whisper",
      language: "en",
			whisper: {
				model: 'small.en'
			}
    })

    log(`识别完成，语言: ${result.language}`)
    log(`识别结果: ${result.transcript}`)

    return result
  } catch (error) {
    log(`语音识别测试失败: ${error.message}`)
    throw error
  }
}

// 测试语音对齐
async function testAlignment(audioPath, transcript) {
  log("测试语音对齐...")
  try {
    const result = await Echogarden.align(audioPath, transcript, {
      engine: "whisper",
      language: "en",
    })

    log(`对齐完成，语言: ${result.language}`)

    // 生成字幕文件
    const subtitles = Echogarden.timelineToSubtitles(result.wordTimeline, {
      format: "srt",
      language: "en",
      mode: "word",
    })

    writeFileSync("test-subtitles.srt", subtitles)
    log("字幕已保存到 test-subtitles.srt")

    return result
  } catch (error) {
    log(`语音对齐测试失败: ${error.message}`)
    throw error
  }
}

// 测试语音翻译
async function testSpeechTranslation(audioPath) {
  log("测试语音翻译...")
  try {
    const result = await Echogarden.translateSpeech(audioPath, {
      engine: "whisper",
      sourceLanguage: "en",
    })

    log(`翻译完成，源语言: ${result.sourceLanguage}, 目标语言: ${result.targetLanguage}`)
    log(`翻译结果: ${result.transcript}`)

    return result
  } catch (error) {
    log(`语音翻译测试失败: ${error.message}`)
    throw error
  }
}

// 测试语音语言检测
async function testSpeechLanguageDetection(audioPath) {
  log("测试语音语言检测...")
  try {
    const result = await Echogarden.detectSpeechLanguage(audioPath, {
      engine: "whisper",
    })

    log(`语言检测完成，检测到的语言: ${result.detectedLanguage} (${result.detectedLanguageName})`)

    return result
  } catch (error) {
    log(`语音语言检测测试失败: ${error.message}`)
    throw error
  }
}

// 测试文本语言检测
async function testTextLanguageDetection() {
  log("测试文本语言检测...")
  try {
    const result = await Echogarden.detectTextLanguage("This is an English text for testing language detection.", {
      engine: "tinyld",
    })

    log(`语言检测完成，检测到的语言: ${result.detectedLanguage} (${result.detectedLanguageName})`)

    return result
  } catch (error) {
    log(`文本语言检测测试失败: ${error.message}`)
    throw error
  }
}

// 测试语音活动检测
async function testVoiceActivityDetection(audioPath) {
  log("测试语音活动检测...")
  try {
    const result = await Echogarden.detectVoiceActivity(audioPath, {
      engine: "silero",
    })

    log(`语音活动检测完成，检测到 ${result.timeline.length} 个活动片段`)

    // 保存裁剪后的音频
    if (result.croppedRawAudio) {
      // 这里需要将 RawAudio 转换为 WAV 格式
      // 实际使用时可能需要使用 Echogarden 的内部函数
      log("已生成裁剪后的音频")
    }

    return result
  } catch (error) {
    log(`语音活动检测测试失败: ${error.message}`)
    throw error
  }
}

// 测试源分离
async function testSourceSeparation(audioPath) {
  log("测试源分离...")
  try {
    const result = await Echogarden.isolate(audioPath, {
      engine: "mdx-net",
    })

    log("源分离完成")

    // 保存分离后的音频
    // 这里需要将 RawAudio 转换为 WAV 格式
    // 实际使用时可能需要使用 Echogarden 的内部函数
    log("已生成分离后的音频")

    return result
  } catch (error) {
    log(`源分离测试失败: ${error.message}`)
    throw error
  }
}

// 测试 WebSocket 服务器
async function testServer() {
  log("测试 WebSocket 服务器...")
  try {
    // 启动服务器
    await Echogarden.startServer({ port: 45054 }, (options) => {
      log(`服务器已启动，端口: ${options.port}`)
    })

    log("服务器测试完成")

    // 注意：这个函数不会返回，因为服务器会一直运行
    // 在实际测试中，您可能需要设置一个超时或手动停止服务器
  } catch (error) {
    log(`服务器测试失败: ${error.message}`)
    throw error
  }
}

// 主测试函数
async function runTests() {
  try {
    // 使用预设的音频文件进行测试
    const audioFile = "./audio_files/preview.wav"
    
    // 测试语音识别
    const recognitionResult = await testRecognition(audioFile)
    
    // 测试语音对齐
    const alignmentResult = await testAlignment(audioFile, recognitionResult.transcript)
    
    // 测试语音语言检测
    const speechLangResult = await testSpeechLanguageDetection(audioFile)
    
    // 测试语音活动检测
    const vadResult = await testVoiceActivityDetection(audioFile)
    
    log("所有测试完成！")
  } catch (error) {
    log(`测试过程中发生错误: ${error.message}`)
  }
}

// 运行测试
runTests()
