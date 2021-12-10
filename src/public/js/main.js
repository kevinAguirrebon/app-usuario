const eliminar = (id) =>{
    Swal.fire({
        title: 'Estas seguro?',
        text: "Este usuario se eliminara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then(async (result) => {
        if (result.isConfirmed) {
            const peticion = await fetch(`/user/delete/${id}`, {
                method: 'DELETE',
            });
            const result = await peticion.json();
            if(result.status){
                window.location.href = '/users';
            }else{
                Swal.fire(
                    'Error?',
                    'No se puedo eliminar?',
                    'warning'
                )
            }
        }
      })
}
