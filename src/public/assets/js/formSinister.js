jQuery(function ($) {
  var jsonData = document.getElementById("json-data").value
  var inputJson = document.getElementById("jsonConfig")
  var fbTemplate = document.getElementById("build-wrap")
  var options = {
    formData: jsonData,
    onSave: function (evt, formData) {
      toggleEdit(false)
      $(".render-wrap").formRender({ formData })
      inputJson.value = formData
    },
    disabledActionButtons: ["data", "clear"],
    onOpenFieldEdit: function (editPanel) {
      location.reload()
      alert("Função de formulário desativada.")
    },
    allowStageSort: false,
    disabledFieldButtons: {
      text: ["edit", "remove", "copy"],
    },
    disableFields: [
      "autocomplete",
      "button",
      "header",
      "hidden",
      "paragraph",
      "starRating",
      "radio-group",
      "select",
      "checkbox-group",
      "textarea",
      "date",
      "file",
      "number",
      "text",
    ],
    i18n: {
      override: {
        "en-US": {
          save: `Continuar edição <i class="ri-arrow-right-fill align-middle"></i>`,
        },
      },
    },
  }
  $(fbTemplate).formBuilder(options)
  const fbRender = document.getElementById("fb-render")
  const originalFormData = document.getElementById("json-render").value
  $(fbRender).formRender({ originalFormData })
})

function toggleEdit(editing) {
  document.body.classList.toggle("form-rendered", !editing)
}

document.getElementById("edit-form-builder").onclick = function () {
  toggleEdit(true)
}
