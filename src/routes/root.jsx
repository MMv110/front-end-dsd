import { useParams } from "react-router-dom";

export default function Root() {
  
  const params = useParams()
  const email = params.email
  const token = params.token

  sessionStorage.setItem('email', email)
  sessionStorage.setItem('token', token)

  window.location.href = '/home'
}