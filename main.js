async function main() {
  const vide = document.getElementById('video')
  const preview = document.getElementById('preview')
  const captureBtn = document.getElementById('startbutton')
  const redoBtn = document.getElementById('redobutton')
  const acceptBtn = document.getElementById('acceptbutton')

  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  video.srcObject = stream
  await playVideo(video)

  captureBtn.addEventListener('click', (ev) => {
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
    preview.style.display = 'block'
    captureBtn.style.display = 'none'
    redoBtn.style.display = 'block'
    acceptBtn.style.display = 'block'
  }, false)
  captureBtn.disabled = false
  redoBtn.addEventListener('click', ev => {
    preview.removeAttribute('src')
    preview.style.display = 'none'
    captureBtn.style.display = 'block'
    redoBtn.style.display = 'none'
    acceptBtn.style.display = 'none'
  }, false)
  redoBtn.disabled = false
  acceptBtn.addEventListener('click', ev => {
    const a = document.createElement('a')
    a.href = preview.src
    a.setAttribute('download', 'image.png')
    a.click()
    preview.style.display = 'none'
    captureBtn.style.display = 'block'
    redoBtn.style.display = 'none'
    acceptBtn.style.display = 'none'
  }, false)
  acceptBtn.disabled = false
}

function playVideo(videoElement) {
  return new Promise((res, rej) => {
    videoElement.addEventListener('canplay', () => {
      res()
    }, false)
    videoElement.play()
  })
}

main()
