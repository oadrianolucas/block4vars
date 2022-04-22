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
    disabledActionButtons: ["data"],
    disableFields: [
      "autocomplete",
      "button",
      "header",
      "hidden",
      "paragraph",
      "starRating",
      "radio-group",
      "select",
      "file",
      "checkbox-group",
    ],
    i18n: {
      override: {
        "en-US": {
          addOption: "Add Opção +",
          allFieldsRemoved: "Todos os campos foram removidos.",
          allowMultipleFiles:
            "Permitir que os usuários façam upload de vários arquivos",
          autocomplete: "Autocomplete",
          button: "Botão",
          cannotBeEmpty: "Este campo não pode ficar vazio",
          checkboxGroup: "Checkboxes",
          className: "Classe",
          clearAllMessage: "Tem certeza de que deseja limpar todos os campos?",
          clear: "Remover tudo",
          close: "Fechar",
          content: "Contente",
          copy: "Copiar para área de transferência",
          copyButton: "&#43;",
          copyButtonTooltip: "Copiar",
          dateField: "Escolha uma data",
          description: "Texto de ajuda",
          descriptionField: "Descrição",
          devMode: "Modo de desenvolvedor",
          editNames: "Editar nomes",
          editorTitle: "Elementos do formulário",
          editXML: "Editar XML",
          enableOther: "Habilitar &quot;Other&quot;",
          enableOtherMsg:
            "Permitir que os usuários insiram uma opção não listada",
          fieldNonEditable: "Este campo não pode ser editado.",
          fieldRemoveWarning: "Tem certeza de que deseja remover este campo?",
          fileUpload: "Arquivo Upload",
          formUpdated: "Formulário atualizado",
          getStarted: "Arraste um campo da direita para esta área",
          header: "Título",
          hide: "Editar",
          hidden: "Esconder Input",
          inline: "Em linha",
          inlineDesc: "Display {type} em linha",
          label: "Label",
          labelEmpty: "O rótulo do campo não pode ficar vazio",
          limitRole: "Limite o acesso a uma ou mais das seguintes funções:",
          mandatory: "Obrigatoriedade",
          maxlength: "Max Comprimento",
          minOptionMessage: "Este campo requer um mínimo de 2 opções",
          multipleFiles: "Vários arquivos",
          name: "Nome",
          no: "Não",
          noFieldsToClear: "Não há campos para limpar",
          number: "Número",
          off: "Off",
          on: "On",
          option: "Opção",
          options: "Opções",
          optional: "optional",
          optionLabelPlaceholder: "Label",
          optionValuePlaceholder: "Value",
          optionEmpty: "Valor da opção obrigatório",
          other: "De outros",
          paragraph: "Parágrafo",
          "placeholder.value": "Value",
          "placeholder.label": "Label",
          "placeholder.text": "",
          "placeholder.textarea": "",
          "placeholder.email": "Digite seu e-mail",
          "placeholder.placeholder": "",
          "placeholder.className": "space separated classes",
          "placeholder.password": "Coloque sua senha",
          preview: "Preview",
          radioGroup: "Radio",
          radio: "Radio",
          removeMessage: "Remover elemento",
          removeOption: "Remover opção",
          remove: "&#215;",
          required: "Requerido",
          richText: "Rich Text Editor",
          roles: "Acesso",
          rows: "Rows",
          save: "Salvar",
          selectOptions: "Opções",
          select: "Lista Fabulosa",
          selectColor: "Select Color",
          selectionsMessage: "Permitir várias seleções",
          size: "Size",
          "size.xs": "Extra Small",
          "size.sm": "Small",
          "size.m": "Default",
          "size.lg": "Large",
          style: "Style",
          styles: {
            btn: {
              default: "Default",
              danger: "Danger",
              info: "Info",
              primary: "Primary",
              success: "Success",
              warning: "Warning",
            },
          },
          subtype: "Type",
          text: "Input",
          textArea: "Text Area",
          toggle: "Toggle",
          warning: "Aviso!",
          value: "Value",
          viewJSON: "{  }",
          viewXML: "&lt;/&gt;",
          yes: "Sim",
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
