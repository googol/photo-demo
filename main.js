async function main() {
  const vide = document.getElementById('video')
  const preview = document.getElementById('preview')
  const captureBtn = document.getElementById('startbutton')
  const switchBtn = document.getElementById('switchbutton')
  const redoBtn = document.getElementById('redobutton')
  const acceptBtn = document.getElementById('acceptbutton')

  const mediaDevices = await navigator.mediaDevices.enumerateDevices()
  const videoInputs = mediaDevices.filter(device => device.kind === "videoinput")

  let currentVideoInputIndex = 0

  await playStreamAtIndex(0)

  makeClickable(captureBtn, ev => {
    ev.preventDefault()
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.fillStyle = "#AAA"
    context.fillRect(0, 0, canvas.width ,canvas.height)
    context.drawImage(video, 0, 0)
    const data = canvas.toDataURL('image/jpeg')
    preview.setAttribute('src', data)
    setButtonStates('preview')
  })
  makeClickable(switchBtn, ev => {
    currentVideoInputIndex = (currentVideoInputIndex + 1) % videoInputs.length
    playStreamAtIndex(currentVideoInputIndex)
    setButtonStates('loading')
  })
  makeClickable(redoBtn, ev => {
    preview.removeAttribute('src')
    setButtonStates('camera')
  })
  makeClickable(acceptBtn, ev => {
    const a = document.createElement('a')
    a.href = preview.src
    a.setAttribute('download', 'image.png')
    a.click()
    setButtonStates('camera')
  })

  async function playStreamAtIndex(inputIndex) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: videoInputs[inputIndex].deviceId }, audio: false })
    video.srcObject = stream
    await playVideo(video)
    setButtonStates('camera')
  }
  function setButtonStates(state) {
    preview.style.display = state === 'preview' ? 'block' : 'none'
    captureBtn.style.display = state === 'camera' ? 'block' : 'none'
    switchBtn.style.display = videoInputs.length > 1 && state === 'camera'? 'block' : 'none'
    redoBtn.style.display = state === 'preview' ? 'block' : 'none'
    acceptBtn.style.display = state === 'preview' ? 'block' : 'none'
  }
}

function playVideo(videoElement) {
  return new Promise((res, rej) => {
    videoElement.addEventListener('canplay', () => {
      res()
    }, false)
    videoElement.play()
  })
}

function makeClickable(button, handler) {
  button.addEventListener('click', handler, false)
  button.disabled = false
}

main()
