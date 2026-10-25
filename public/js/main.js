const complete = document.querySelectorAll('.editSave');

const trashy = document.querySelectorAll('.trash')

Array.from(complete).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.dataset.editSaveId
        const quantity = document.getElementById(`quantity-${id}`).value
        const refills = document.getElementById(`refills-${id}`).value
        console.log('id:', id, 'quantity:', quantity, 'refills:', refills)
        fetch(`/prescriptions/${id}`, { // the name in fetch has to match with the server, but with Express we dont need
          method: 'put',            // to add the slash
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({quantity, refills})
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trashy).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.dataset.trashId
        fetch(`/prescriptions/${id}`, { // the name in fetch has to match with the server, but with Express we dont need
          method: 'delete',            // to add the slash
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});