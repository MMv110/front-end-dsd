import { React, useState } from 'react';
import { useParams } from "react-router-dom";

export default function Root() {
  
  const params = useParams()
  const email = params.email
  const token = params.token

  window.location.href = '/home'
}