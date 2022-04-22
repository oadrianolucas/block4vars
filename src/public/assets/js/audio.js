$(function () {
  let mediaRecorder
  navigator.mediaDevices.getUserMedia({ audio: true }).then(
    (stream) => {
      mediaRecorder = new MediaRecorder(stream)
      let chunks = []
      mediaRecorder.ondataavailable = (data) => {
        chunks.push(data.data)
      }
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; code=opus" })
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          const audio = document.createElement("audio")
          audio.src = reader.result
          audio.controls = true
          $(".audios").append(audio)
          console.log(reader.result)
        }
      }
    },
    (err) => {
      alert("Você deve permitir o audio")
    }
  )
  $("#btn-audio").click(function () {
    if ($(this).text() == "▶️ Iniciar") {
      mediaRecorder.start()
      $(this).text("| | Parar")
    } else {
      mediaRecorder.stop()
      $(this).text("▶️ Iniciar")
    }
  })
})
