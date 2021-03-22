import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Certificate from './Certificate'

test('renders certificates',() => {
  const certs = [{
    id:1,
    level:'Associate',
    certid:'fzrhtt',
    csp:'GCP',
    certname: 'Google Cloud Associate Developer',
    expiry_date: '2021-12-12',
    certified_date: '2020-12-20',
    sbu:'SBU 1',
    pdf_url: 'https://storage.googleapis.com/certificate_pdf/pdf/akishore@virtusa.comcavbzx.pdf',
    user: { id:1,name:'testuser',email:'testuser@xyzcompany.com',empid:'982736dd',user_type:'nuser' }
  }]

  const component = render(
    <Certificate certs={certs} />
  )

  expect(component.container).toHaveTextContent(
    'fzrhtt'
  )

})