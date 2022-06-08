
// EVENTO-1

let formulario = document.getElementById('form')
let arrayForm = JSON.parse(localStorage.getItem('arrayForm')) ?? []

formulario.addEventListener('submit', (event)=>{
    event.preventDefault()
    let name = document.getElementById('disabledTextInput').value
    let date =  document.getElementById('disabledSelect').value
    let email =  document.getElementById('disabledTextInputE').value
    let message=  document.getElementById('disabledTextInputM').value

    
    arrayForm.push({name:name, date:date, email:email, message:message})
    console.log(arrayForm)
    localStorage.setItem('formulario',JSON.stringify(arrayForm));
    formulario.reset()
})
