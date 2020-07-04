import Swal from "sweetalert2"

export const handleError = (error) => {
  console.log(error)
  console.log(error?.request)
  console.log(error?.response)
  if(error?.response?.status === 403)
    return Swal.fire({
      title: 'Wait',
      text: 'Please Load Wallet First!',
      type: 'error'
    })
  return Swal.fire('Oops...',error?.response?.data?.message || 'Unable To Process Request, Try Again Later', 'error');
}