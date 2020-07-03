import Swal from "sweetalert2"

export const handleError = (error) => {
  Swal(error.response.message)
}