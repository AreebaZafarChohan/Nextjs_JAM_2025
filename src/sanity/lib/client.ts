import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: "skv0pANhGvUagRUxfiIiCXfVvhOBoTBimwHUheV8GcIIGgg7Ux8H7GgIKEeNY5B9v4s9p2Jp1TfIvQ9IPm2cO0qebD49WZwWCsF72H6m0Vzru5iTkfCvCRAjiheyQxn66PicW0VeP66rQrhs88JNOtfjniyqpDlaAHA0r0mApO5QYixnSLkw",
})
