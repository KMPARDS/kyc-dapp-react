import Swal from "sweetalert2"

export const handleError = (error) => {
  console.log(error)
  console.log(error?.request)
  console.log(error?.response)
  if(error?.response?.status === 403)
    return Swal.fire('Sign In','Please Load Wallet First!','warning');
	if(error?.response?.status === 400)
  	return Swal.fire('Oops...',error?.response?.data?.message || 'Unable To Process Request, Try Again Later', 'error');
}