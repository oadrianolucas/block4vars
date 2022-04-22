const getUserDataBtn = document.getElementById("get-user-data")
const fbRender = document.getElementById("fb-render")
const originalFormData = document.getElementById("json-render").value

jQuery(function ($) {
  const formData = JSON.parse(originalFormData)
  console.log(formData)
  $(fbRender).formRender({ formData })
  getUserDataBtn.addEventListener(
    "click",
    () => {
      window.alert(window.JSON.stringify($(fbRender).formRender("userData")))
    },
    false
  )
})
